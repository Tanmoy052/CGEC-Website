import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../lib/cloudinary';
import fs from 'fs';
import path from 'path';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Helper to safely get string param
const getParamId = (req: Request): string => {
  const id = req.params.id;
  return Array.isArray(id) ? id[0] : id;
};

// Helper: Silently destroy an asset from Cloudinary AND/OR local file system
const deleteMediaAsset = async (
  urlOrPath: string | null | undefined,
  publicId: string | null | undefined,
  resourceType: 'image' | 'raw' = 'image'
) => {
  // 1. Cloudinary Asset Cleanup
  if (publicId && publicId.startsWith('cgec_website')) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      console.log(`✅ Cloudinary asset deleted: ${publicId}`);
    } catch (err: any) {
      console.warn(`⚠️ Cloudinary destroy error for ${publicId}:`, err.message);
    }
  }

  // 2. Local Fallback File Cleanup on Disk (e.g. /uploads/wall_magazine/...)
  if (urlOrPath && urlOrPath.startsWith('/uploads/')) {
    try {
      const localFilePath = path.resolve(__dirname, '../../../frontend/public', urlOrPath.replace(/^\//, ''));
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
        console.log(`✅ Local uploaded file deleted from disk: ${localFilePath}`);
      }
    } catch (err: any) {
      console.warn(`⚠️ Local file delete error for ${urlOrPath}:`, err.message);
    }
  }
};

// ==================== DASHBOARD STATS ====================
export const getStats = async (req: Request, res: Response) => {
  try {
    const [facultyCount, noticesCount, syllabusCount, labsCount, galleryCount, usersCount, wallMagCount] = await Promise.all([
      prisma.faculty.count(),
      prisma.notice.count(),
      prisma.syllabus.count(),
      prisma.lab.count(),
      prisma.gallery.count(),
      prisma.user.count(),
      prisma.wallMagazine.count(),
    ]);

    const recentNotices = await prisma.notice.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const recentFaculty = await prisma.faculty.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      counts: {
        faculty: facultyCount,
        notices: noticesCount,
        syllabus: syllabusCount,
        labs: labsCount,
        gallery: galleryCount,
        users: usersCount,
        wallMagazine: wallMagCount,
      },
      recentNotices,
      recentFaculty,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== FACULTY MANAGEMENT ====================
export const getFacultyList = async (req: Request, res: Response) => {
  try {
    const { department } = req.query;
    const filter = department && department !== 'ALL' ? { department: String(department) } : {};
    const faculty = await prisma.faculty.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });
    res.json(faculty);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createFaculty = async (req: Request, res: Response) => {
  const { name, designation, department, email, phone, experience, specialization, qualifications, image, imagePublicId, cvLink, cvPublicId, publications } = req.body;

  try {
    if (!name || !designation || !department || !email) {
      return res.status(400).json({ message: 'Name, Designation, Department, and Email are required.' });
    }

    const existing = await prisma.faculty.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'A faculty member with this email already exists.' });
    }

    const newFaculty = await prisma.faculty.create({
      data: {
        name,
        designation,
        department,
        email,
        phone: phone || null,
        experience: experience || null,
        specialization: Array.isArray(specialization) ? specialization : specialization ? [specialization] : [],
        qualifications: Array.isArray(qualifications) ? qualifications : qualifications ? [qualifications] : [],
        image: image || null,
        imagePublicId: imagePublicId || null,
        cvLink: cvLink || null,
        cvPublicId: cvPublicId || null,
        publications: Array.isArray(publications) ? publications : publications ? [publications] : [],
      },
    });

    res.status(201).json(newFaculty);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFaculty = async (req: Request, res: Response) => {
  const id = getParamId(req);
  const { name, designation, department, email, phone, experience, specialization, qualifications, image, imagePublicId, cvLink, cvPublicId, publications } = req.body;

  try {
    const updatedFaculty = await prisma.faculty.update({
      where: { id },
      data: {
        name,
        designation,
        department,
        email,
        phone,
        experience,
        specialization: Array.isArray(specialization) ? specialization : specialization ? [specialization] : undefined,
        qualifications: Array.isArray(qualifications) ? qualifications : qualifications ? [qualifications] : undefined,
        image,
        imagePublicId: imagePublicId || null,
        cvLink,
        cvPublicId: cvPublicId || null,
        publications: Array.isArray(publications) ? publications : publications ? [publications] : undefined,
      },
    });

    res.json(updatedFaculty);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFaculty = async (req: Request, res: Response) => {
  const id = getParamId(req);
  try {
    const existing = await prisma.faculty.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }

    // 1. Clean up media (Cloudinary and/or local disk)
    await deleteMediaAsset(existing.image, existing.imagePublicId, 'image');
    await deleteMediaAsset(existing.cvLink, existing.cvPublicId, 'raw');

    // 2. Delete from MongoDB
    await prisma.faculty.delete({ where: { id } });

    res.json({ message: 'Faculty member deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== SYLLABUS & PDF MANAGEMENT ====================
export const getSyllabusList = async (req: Request, res: Response) => {
  try {
    const { department, semester } = req.query;
    const filter: any = {};
    if (department && department !== 'ALL') filter.department = String(department);
    if (semester && semester !== 'ALL') filter.semester = String(semester);

    const syllabus = await prisma.syllabus.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });
    res.json(syllabus);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createSyllabus = async (req: Request, res: Response) => {
  const { department, semester, title, description, pdfLink, pdfPublicId, academicYear } = req.body;

  try {
    if (!department || !semester || !title || !pdfLink) {
      return res.status(400).json({ message: 'Department, Semester, Title, and PDF link are required.' });
    }

    const newSyllabus = await prisma.syllabus.create({
      data: {
        department,
        semester,
        title,
        description: description || null,
        pdfLink,
        pdfPublicId: pdfPublicId || null,
        academicYear: academicYear || null,
      },
    });

    res.status(201).json(newSyllabus);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSyllabus = async (req: Request, res: Response) => {
  const id = getParamId(req);
  const { department, semester, title, description, pdfLink, pdfPublicId, academicYear } = req.body;

  try {
    const updated = await prisma.syllabus.update({
      where: { id },
      data: {
        department,
        semester,
        title,
        description,
        pdfLink,
        pdfPublicId: pdfPublicId || null,
        academicYear,
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSyllabus = async (req: Request, res: Response) => {
  const id = getParamId(req);
  try {
    const existing = await prisma.syllabus.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Syllabus entry not found' });
    }
    await deleteMediaAsset(existing.pdfLink, existing.pdfPublicId, 'raw');
    await prisma.syllabus.delete({ where: { id } });
    res.json({ message: 'Syllabus entry deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== NOTICES MANAGEMENT ====================
export const getNoticesList = async (req: Request, res: Response) => {
  try {
    const { category, department } = req.query;
    const filter: any = {};
    if (category && category !== 'ALL') filter.category = String(category);
    if (department && department !== 'ALL') filter.department = String(department);

    const notices = await prisma.notice.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });
    res.json(notices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotice = async (req: Request, res: Response) => {
  const { title, content, category, priority, expiryDate, attachment, attachmentPublicId, department, authorName } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and Content are required.' });
    }

    const newNotice = await prisma.notice.create({
      data: {
        title,
        content,
        category: category || 'General',
        priority: priority || 'NORMAL',
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        attachment: attachment || null,
        attachmentPublicId: attachmentPublicId || null,
        department: department || null,
        authorName: authorName || 'Administrator',
      },
    });

    res.status(201).json(newNotice);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotice = async (req: Request, res: Response) => {
  const id = getParamId(req);
  const { title, content, category, priority, expiryDate, attachment, attachmentPublicId, department, authorName } = req.body;

  try {
    const updated = await prisma.notice.update({
      where: { id },
      data: {
        title,
        content,
        category,
        priority,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        attachment,
        attachmentPublicId: attachmentPublicId || null,
        department,
        authorName,
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotice = async (req: Request, res: Response) => {
  const id = getParamId(req);
  try {
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    await deleteMediaAsset(existing.attachment, existing.attachmentPublicId, 'raw');
    await prisma.notice.delete({ where: { id } });
    res.json({ message: 'Notice deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== LABS MANAGEMENT ====================
export const getLabsList = async (req: Request, res: Response) => {
  try {
    const { department } = req.query;
    const filter = department && department !== 'ALL' ? { department: String(department) } : {};
    const labs = await prisma.lab.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });
    res.json(labs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLab = async (req: Request, res: Response) => {
  const { department, name, description, image, imagePublicId, roomNumber, facultyInCharge } = req.body;

  try {
    if (!department || !name || !description) {
      return res.status(400).json({ message: 'Department, Name, and Description are required.' });
    }

    const newLab = await prisma.lab.create({
      data: {
        department,
        name,
        description,
        image: image || null,
        imagePublicId: imagePublicId || null,
        roomNumber: roomNumber || null,
        facultyInCharge: facultyInCharge || null,
      },
    });

    res.status(201).json(newLab);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLab = async (req: Request, res: Response) => {
  const id = getParamId(req);
  const { department, name, description, image, imagePublicId, roomNumber, facultyInCharge } = req.body;

  try {
    const updated = await prisma.lab.update({
      where: { id },
      data: {
        department,
        name,
        description,
        image,
        imagePublicId: imagePublicId || null,
        roomNumber,
        facultyInCharge,
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLab = async (req: Request, res: Response) => {
  const id = getParamId(req);
  try {
    const existing = await prisma.lab.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Lab not found' });
    }
    await deleteMediaAsset(existing.image, existing.imagePublicId, 'image');
    await prisma.lab.delete({ where: { id } });
    res.json({ message: 'Lab deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== GALLERY MANAGEMENT ====================
export const getGalleryList = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'ALL' ? { category: String(category) } : {};
    const items = await prisma.gallery.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  const { title, category, imageUrl, imagePublicId, description } = req.body;

  try {
    if (!title || !imageUrl) {
      return res.status(400).json({ message: 'Title and Image URL are required.' });
    }

    const newItem = await prisma.gallery.create({
      data: {
        title,
        category: category || 'Campus',
        imageUrl,
        imagePublicId: imagePublicId || null,
        description: description || null,
      },
    });

    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  const id = getParamId(req);
  try {
    const existing = await prisma.gallery.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    await deleteMediaAsset(existing.imageUrl, existing.imagePublicId, 'image');
    await prisma.gallery.delete({ where: { id } });
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== ADMIN PROFILE & SECURITY MANAGEMENT ====================
export const getAdminProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, email, currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    const updateData: any = {};

    // 1. Update Name
    if (name && name.trim()) {
      updateData.name = name.trim();
    }

    // 2. Update Email / Username
    if (email && email.trim() && email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const emailLower = email.trim().toLowerCase();
      const existingUser = await prisma.user.findUnique({ where: { email: emailLower } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(400).json({ message: 'Email / Username already taken by another account.' });
      }
      updateData.email = emailLower;
    }

    // 3. Update Password if requested
    if (newPassword && newPassword.trim()) {
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
      }

      // If current password was provided, verify it
      if (currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Current password does not match.' });
        }
      }

      updateData.password = await bcrypt.hash(newPassword.trim(), 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    // Generate fresh JWT token
    const token = jwt.sign(
      { id: updatedUser.id, role: updatedUser.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Admin profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== WALL MAGAZINE MANAGEMENT ====================
export const getWallMagazineList = async (req: Request, res: Response) => {
  try {
    const items = await prisma.wallMagazine.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createWallMagazine = async (req: Request, res: Response) => {
  const { title, edition, year, description, imageUrl, imagePublicId, pdfLink, pdfPublicId, department } = req.body;
  try {
    if (!title || !imageUrl) {
      return res.status(400).json({ message: 'Title and Image URL are required.' });
    }
    const newItem = await prisma.wallMagazine.create({
      data: {
        title,
        edition: edition || null,
        year: year || null,
        description: description || null,
        imageUrl,
        imagePublicId: imagePublicId || null,
        pdfLink: pdfLink || null,
        pdfPublicId: pdfPublicId || null,
        department: department || null,
      },
    });
    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWallMagazine = async (req: Request, res: Response) => {
  const id = getParamId(req);
  const { title, edition, year, description, imageUrl, imagePublicId, pdfLink, pdfPublicId, department } = req.body;
  try {
    const updated = await prisma.wallMagazine.update({
      where: { id },
      data: {
        title,
        edition: edition || null,
        year: year || null,
        description: description || null,
        imageUrl,
        imagePublicId: imagePublicId || null,
        pdfLink: pdfLink || null,
        pdfPublicId: pdfPublicId || null,
        department: department || null,
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWallMagazine = async (req: Request, res: Response) => {
  const id = getParamId(req);
  try {
    const existing = await prisma.wallMagazine.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Wall magazine item not found' });
    }
    // Clean up both the cover image and the PDF (from Cloudinary AND from local disk)
    await deleteMediaAsset(existing.imageUrl, existing.imagePublicId, 'image');
    await deleteMediaAsset(existing.pdfLink, existing.pdfPublicId, 'raw');
    await prisma.wallMagazine.delete({ where: { id } });
    res.json({ message: 'Wall magazine item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
