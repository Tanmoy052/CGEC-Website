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
    const [
      facultyCount,
      noticesCount,
      syllabusCount,
      labsCount,
      galleryCount,
      usersCount,
      wallMagCount,
      admissionCount,
      feeCount,
      committeeCount,
      leadershipCount,
      recruiterCount,
      brochureCount,
      hodMessagesCount,
      messagesCount,
      heroSlidesCount,
    ] = await Promise.all([
      prisma.faculty.count(),
      prisma.notice.count(),
      prisma.syllabus.count(),
      prisma.lab.count(),
      prisma.gallery.count(),
      prisma.user.count(),
      prisma.wallMagazine.count(),
      prisma.admissionItem.count(),
      prisma.feeItem.count(),
      prisma.committeeMember.count(),
      prisma.leadershipMessage.count(),
      prisma.recruiter.count(),
      prisma.placementBrochure.count(),
      prisma.hodMessage.count(),
      prisma.contactMessage.count(),
      prisma.heroSlide.count(),
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
        admission: admissionCount,
        fees: feeCount,
        committees: committeeCount,
        leadership: leadershipCount,
        recruiters: recruiterCount,
        brochures: brochureCount,
        hodMessages: hodMessagesCount,
        messages: messagesCount,
        heroSlides: heroSlidesCount,
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
      if (newPassword.trim().length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
      }

      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to change password.' });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password does not match.' });
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

// ==================== ADMISSION PORTAL & CONFIG ====================
export const getAdmissionData = async (req: Request, res: Response) => {
  try {
    const rawYear = req.query.year as string | undefined;
    const requestedYear = rawYear ? rawYear.trim() : undefined;

    // 1. Determine the globally active admission configuration
    let activeConfig = await prisma.admissionConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!activeConfig) {
      activeConfig = await prisma.admissionConfig.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
      if (activeConfig) {
        activeConfig = await prisma.admissionConfig.update({
          where: { id: activeConfig.id },
          data: { isActive: true },
        });
      }
    }

    if (!activeConfig) {
      const fallbackYear = new Date().getFullYear().toString();
      activeConfig = await prisma.admissionConfig.create({
        data: {
          year: fallbackYear,
          isActive: true,
          whatsappLink: '',
          contactPhone: '',
          contactEmail: '',
          officerName: '',
          officerRole: `PI Admin, Admission (${fallbackYear})`,
          officerDesignation: '',
        },
      });
    }

    const activeYear = activeConfig.year;
    const selectedYear = requestedYear || activeYear;

    let targetConfig: typeof activeConfig | null = activeConfig;
    if (requestedYear && requestedYear !== activeYear) {
      targetConfig = await prisma.admissionConfig.findUnique({
        where: { year: requestedYear },
      });
    }

    const items = await prisma.admissionItem.findMany({
      where: { year: selectedYear },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    // Collect all available years in the system
    const allConfigs = await prisma.admissionConfig.findMany({
      select: { year: true },
      orderBy: { year: 'desc' },
    });
    const allItems = await prisma.admissionItem.findMany({
      select: { year: true },
      distinct: ['year'],
    });

    const availableYears = Array.from(
      new Set([activeYear, selectedYear, ...allConfigs.map((c) => c.year), ...allItems.map((i) => i.year)])
    ).filter(Boolean).sort().reverse();

    res.json({
      items,
      config: targetConfig || {
        year: selectedYear,
        whatsappLink: '',
        contactPhone: '',
        contactEmail: '',
        officerName: '',
        officerRole: '',
        officerDesignation: '',
      },
      activeYear,
      selectedYear,
      availableYears,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmissionItem = async (req: Request, res: Response) => {
  try {
    const { year, category = 'NOTICE', title, fileUrl, filePublicId, order = 0 } = req.body;
    if (!title || !fileUrl) {
      return res.status(400).json({ message: 'Title and File URL are required' });
    }
    let targetYear = year;
    if (!targetYear) {
      const active = await prisma.admissionConfig.findFirst({ where: { isActive: true } });
      targetYear = active?.year || new Date().getFullYear().toString();
    }
    const item = await prisma.admissionItem.create({
      data: {
        year: targetYear,
        category,
        title,
        fileUrl,
        filePublicId: filePublicId || null,
        order: Number(order) || 0,
      },
    });
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmissionItem = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const { year, category, title, fileUrl, filePublicId, order } = req.body;
    const updated = await prisma.admissionItem.update({
      where: { id },
      data: {
        ...(year && { year }),
        ...(category && { category }),
        ...(title && { title }),
        ...(fileUrl && { fileUrl }),
        ...(filePublicId !== undefined && { filePublicId: filePublicId || null }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmissionItem = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const existing = await prisma.admissionItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Admission item not found' });
    }
    await deleteMediaAsset(existing.fileUrl, existing.filePublicId, 'raw');
    await prisma.admissionItem.delete({ where: { id } });
    res.json({ message: 'Admission item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmissionConfig = async (req: Request, res: Response) => {
  try {
    const { year, whatsappLink, contactPhone, contactEmail, officerName, officerRole, officerDesignation } = req.body;
    let configYear = year;
    if (!configYear) {
      const active = await prisma.admissionConfig.findFirst({ where: { isActive: true } });
      configYear = active?.year || new Date().getFullYear().toString();
    }
    const existing = await prisma.admissionConfig.findUnique({ where: { year: configYear } });

    const config = await prisma.admissionConfig.upsert({
      where: { year: configYear },
      update: {
        ...(whatsappLink !== undefined && { whatsappLink }),
        ...(contactPhone !== undefined && { contactPhone }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(officerName !== undefined && { officerName }),
        ...(officerRole !== undefined && { officerRole }),
        ...(officerDesignation !== undefined && { officerDesignation }),
      },
      create: {
        year: configYear,
        whatsappLink: whatsappLink || '',
        contactPhone: contactPhone || '',
        contactEmail: contactEmail || '',
        officerName: officerName || '',
        officerRole: officerRole || '',
        officerDesignation: officerDesignation || '',
        isActive: existing ? existing.isActive : true,
      },
    });
    res.json(config);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmissionYear = async (req: Request, res: Response) => {
  try {
    const { currentYear, newYear, migrateItems = true } = req.body;
    if (!newYear || typeof newYear !== 'string' || !newYear.trim()) {
      return res.status(400).json({ message: 'Valid admission year is required (e.g. 2026)' });
    }
    const cleanNewYear = newYear.trim();
    const cleanCurrentYear = currentYear ? String(currentYear).trim() : null;

    // Deactivate all configs so only the designated year is active
    await prisma.admissionConfig.updateMany({
      data: { isActive: false },
    });

    // Check if newYear config exists
    let targetConfig = await prisma.admissionConfig.findUnique({
      where: { year: cleanNewYear },
    });

    if (targetConfig) {
      targetConfig = await prisma.admissionConfig.update({
        where: { id: targetConfig.id },
        data: {
          isActive: true,
          updatedAt: new Date(),
        },
      });
    } else {
      // Inherit baseline details from previous year if available
      let baseline = {
        whatsappLink: '',
        contactPhone: '',
        contactEmail: '',
        officerName: '',
        officerRole: `PI Admin, Admission (${cleanNewYear})`,
        officerDesignation: '',
      };

      if (cleanCurrentYear) {
        const oldConfig = await prisma.admissionConfig.findUnique({
          where: { year: cleanCurrentYear },
        });
        if (oldConfig) {
          baseline = {
            whatsappLink: oldConfig.whatsappLink || '',
            contactPhone: oldConfig.contactPhone || '',
            contactEmail: oldConfig.contactEmail || '',
            officerName: oldConfig.officerName || '',
            officerDesignation: oldConfig.officerDesignation || '',
            officerRole: oldConfig.officerRole?.includes(cleanCurrentYear)
              ? oldConfig.officerRole.replace(cleanCurrentYear, cleanNewYear)
              : `PI Admin, Admission (${cleanNewYear})`,
          };
        }
      }

      targetConfig = await prisma.admissionConfig.create({
        data: {
          year: cleanNewYear,
          isActive: true,
          whatsappLink: baseline.whatsappLink,
          contactPhone: baseline.contactPhone,
          contactEmail: baseline.contactEmail,
          officerName: baseline.officerName,
          officerRole: baseline.officerRole,
          officerDesignation: baseline.officerDesignation,
        },
      });
    }

    // Migrate existing items if requested
    if (migrateItems && cleanCurrentYear && cleanCurrentYear !== cleanNewYear) {
      await prisma.admissionItem.updateMany({
        where: { year: cleanCurrentYear },
        data: { year: cleanNewYear },
      });
    }

    res.json({
      message: `Admission academic year successfully updated to ${cleanNewYear}`,
      activeYear: cleanNewYear,
      config: targetConfig,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== FEES STRUCTURE ====================
export const getFeeItems = async (req: Request, res: Response) => {
  try {
    const { admissionType, academicYear } = req.query;
    const where: any = {};
    if (admissionType) where.admissionType = admissionType;
    if (academicYear) where.academicYear = academicYear;

    const items = await prisma.feeItem.findMany({
      where,
      orderBy: [{ admissionType: 'asc' }, { order: 'asc' }],
    });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createFeeItem = async (req: Request, res: Response) => {
  try {
    const { academicYear = '2025-26', admissionType = 'REGULAR', slNo, feeHead, cseEce, core, order = 0 } = req.body;
    if (!feeHead || !cseEce || !core) {
      return res.status(400).json({ message: 'Fee Head, CSE/ECE and CE/ME/EE amounts are required' });
    }
    const item = await prisma.feeItem.create({
      data: {
        academicYear,
        admissionType,
        slNo: String(slNo || ''),
        feeHead,
        cseEce: String(cseEce),
        core: String(core),
        order: Number(order) || 0,
      },
    });
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFeeItem = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const { academicYear, admissionType, slNo, feeHead, cseEce, core, order } = req.body;
    const updated = await prisma.feeItem.update({
      where: { id },
      data: {
        ...(academicYear && { academicYear }),
        ...(admissionType && { admissionType }),
        ...(slNo !== undefined && { slNo: String(slNo) }),
        ...(feeHead && { feeHead }),
        ...(cseEce !== undefined && { cseEce: String(cseEce) }),
        ...(core !== undefined && { core: String(core) }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFeeItem = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    await prisma.feeItem.delete({ where: { id } });
    res.json({ message: 'Fee structure item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== COMMITTEES ====================
export const getCommitteeMembers = async (req: Request, res: Response) => {
  try {
    const { committee } = req.query;
    const where: any = {};
    if (committee) where.committee = String(committee).toLowerCase();

    const members = await prisma.committeeMember.findMany({
      where,
      orderBy: [{ committee: 'asc' }, { order: 'asc' }, { createdAt: 'asc' }],
    });
    res.json(members);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCommitteeMember = async (req: Request, res: Response) => {
  try {
    const { committee, name, position, department, phone, email, order = 0 } = req.body;
    if (!committee || !name || !position) {
      return res.status(400).json({ message: 'Committee, Name, and Position are required' });
    }
    const member = await prisma.committeeMember.create({
      data: {
        committee: String(committee).toLowerCase(),
        name,
        position,
        department: department || null,
        phone: phone || null,
        email: email || null,
        order: Number(order) || 0,
      },
    });
    res.status(201).json(member);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCommitteeMember = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const { committee, name, position, department, phone, email, order } = req.body;
    const updated = await prisma.committeeMember.update({
      where: { id },
      data: {
        ...(committee && { committee: String(committee).toLowerCase() }),
        ...(name && { name }),
        ...(position && { position }),
        ...(department !== undefined && { department: department || null }),
        ...(phone !== undefined && { phone: phone || null }),
        ...(email !== undefined && { email: email || null }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCommitteeMember = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    await prisma.committeeMember.delete({ where: { id } });
    res.json({ message: 'Committee member deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== LEADERSHIP MESSAGES ====================
export const getLeadershipMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.leadershipMessage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createLeadershipMessage = async (req: Request, res: Response) => {
  try {
    const { name, role, dept, message, image, imagePublicId, order = 0 } = req.body;
    if (!name || !role || !message || !image) {
      return res.status(400).json({ message: 'Name, Role, Message and Image are required' });
    }
    const leader = await prisma.leadershipMessage.create({
      data: {
        name,
        role,
        dept: dept || null,
        message,
        image,
        imagePublicId: imagePublicId || null,
        order: Number(order) || 0,
      },
    });
    res.status(201).json(leader);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLeadershipMessage = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const { name, role, dept, message, image, imagePublicId, order } = req.body;
    const updated = await prisma.leadershipMessage.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(dept !== undefined && { dept: dept || null }),
        ...(message && { message }),
        ...(image && { image }),
        ...(imagePublicId !== undefined && { imagePublicId: imagePublicId || null }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLeadershipMessage = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const existing = await prisma.leadershipMessage.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Leader message not found' });
    }
    await deleteMediaAsset(existing.image, existing.imagePublicId, 'image');
    await prisma.leadershipMessage.delete({ where: { id } });
    res.json({ message: 'Leader message deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== RECRUITERS ====================
export const getRecruiters = async (req: Request, res: Response) => {
  try {
    const recruiters = await prisma.recruiter.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    res.json(recruiters);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createRecruiter = async (req: Request, res: Response) => {
  try {
    const { name, logo, logoPublicId, website, order = 0 } = req.body;
    if (!name || !logo) {
      return res.status(400).json({ message: 'Company Name and Logo are required' });
    }
    const recruiter = await prisma.recruiter.create({
      data: {
        name,
        logo,
        logoPublicId: logoPublicId || null,
        website: website || null,
        order: Number(order) || 0,
      },
    });
    res.status(201).json(recruiter);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecruiter = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const { name, logo, logoPublicId, website, order } = req.body;
    const updated = await prisma.recruiter.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(logo && { logo }),
        ...(logoPublicId !== undefined && { logoPublicId: logoPublicId || null }),
        ...(website !== undefined && { website: website || null }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRecruiter = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const existing = await prisma.recruiter.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    await deleteMediaAsset(existing.logo, existing.logoPublicId, 'image');
    await prisma.recruiter.delete({ where: { id } });
    res.json({ message: 'Recruiter deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== PLACEMENT BROCHURE ====================
export const getPlacementBrochures = async (req: Request, res: Response) => {
  try {
    const brochures = await prisma.placementBrochure.findMany({
      orderBy: [{ isActive: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(brochures);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatestBrochure = async (req: Request, res: Response) => {
  try {
    // Return the latest active brochure, or most recent if none explicitly marked active
    let brochure = await prisma.placementBrochure.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!brochure) {
      brochure = await prisma.placementBrochure.findFirst({
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!brochure) {
      return res.status(404).json({ message: 'No placement brochure found' });
    }

    res.json(brochure);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBrochureById = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const brochure = await prisma.placementBrochure.findUnique({
      where: { id },
    });
    if (!brochure) {
      return res.status(404).json({ message: 'Placement brochure not found' });
    }
    res.json(brochure);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlacementBrochure = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      academicYear,
      fileUrl,
      filePublicId,
      fileType,
      fileName,
      fileSize,
      isActive,
      order,
    } = req.body;

    const isSetToActive = isActive !== undefined ? Boolean(isActive) : true;

    // If setting this one to active, we can set others to inactive
    if (isSetToActive) {
      await prisma.placementBrochure.updateMany({
        data: { isActive: false },
      });
    }

    // Enforce PDF format only
    if (fileType && fileType.toLowerCase() !== "pdf") {
      return res.status(400).json({ message: "Only PDF format is supported for placement brochures." });
    }
    if (fileName && !fileName.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({ message: "Only PDF files (.pdf) are supported for placement brochures." });
    }

    const brochure = await prisma.placementBrochure.create({
      data: {
        title: title || 'Placement Brochure',
        description: description || null,
        academicYear: academicYear || '2025-2026',
        fileUrl: fileUrl || null,
        filePublicId: filePublicId || null,
        fileType: 'pdf',
        fileName: fileName || null,
        fileSize: fileSize || null,
        isActive: isSetToActive,
        order: Number(order) || 0,
      },
    });

    res.status(201).json(brochure);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlacementBrochure = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const {
      title,
      description,
      academicYear,
      fileUrl,
      filePublicId,
      fileType,
      fileName,
      fileSize,
      isActive,
      order,
    } = req.body;

    const existing = await prisma.placementBrochure.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Brochure not found' });
    }

    // If fileUrl changed from an existing non-empty URL, delete old asset
    if (fileUrl !== undefined && fileUrl !== existing.fileUrl && existing.fileUrl) {
      const isImg = existing.fileType && ['jpg', 'jpeg', 'png', 'webp'].includes(existing.fileType);
      await deleteMediaAsset(existing.fileUrl, existing.filePublicId, isImg ? 'image' : 'raw');
    }

    if (isActive) {
      await prisma.placementBrochure.updateMany({
        where: { id: { not: id } },
        data: { isActive: false },
      });
    }

    // Enforce PDF format only
    if (fileType && fileType.toLowerCase() !== "pdf") {
      return res.status(400).json({ message: "Only PDF format is supported for placement brochures." });
    }
    if (fileName && !fileName.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({ message: "Only PDF files (.pdf) are supported for placement brochures." });
    }

    const updated = await prisma.placementBrochure.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        description: description !== undefined ? description : existing.description,
        academicYear: academicYear !== undefined ? academicYear : existing.academicYear,
        fileUrl: fileUrl !== undefined ? (fileUrl || null) : existing.fileUrl,
        filePublicId: filePublicId !== undefined ? filePublicId : existing.filePublicId,
        fileType: "pdf",
        fileName: fileName !== undefined ? fileName : existing.fileName,
        fileSize: fileSize !== undefined ? fileSize : existing.fileSize,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
        order: order !== undefined ? Number(order) : existing.order,
      },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlacementBrochure = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const existing = await prisma.placementBrochure.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Brochure not found' });
    }

    const isImg = existing.fileType && ['jpg', 'jpeg', 'png', 'webp'].includes(existing.fileType);
    await deleteMediaAsset(existing.fileUrl, existing.filePublicId, isImg ? 'image' : 'raw');

    await prisma.placementBrochure.delete({ where: { id } });
    res.json({ message: 'Brochure deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== HOD MESSAGES ====================
export const getHodMessages = async (req: Request, res: Response) => {
  try {
    const { department } = req.query;
    if (department && typeof department === 'string') {
      const cleanDept = department.trim().toUpperCase();
      const message = await prisma.hodMessage.findUnique({
        where: { department: cleanDept },
      });
      return res.json(message || null);
    }

    const messages = await prisma.hodMessage.findMany({
      orderBy: { department: 'asc' },
    });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const saveHodMessage = async (req: Request, res: Response) => {
  try {
    const { department, name, designation, message, image, imagePublicId } = req.body;

    if (!department || typeof department !== 'string' || !department.trim()) {
      return res.status(400).json({ message: 'Department is required (e.g. CSE, ECE, EE, ME, CE, BSH)' });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'HOD Name is required' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ message: 'HOD Message content is required' });
    }

    const cleanDept = department.trim().toUpperCase();
    const cleanName = name.trim();
    const cleanDesig = designation?.trim() || 'Head of the Department';
    const cleanMsg = message.trim();

    const saved = await prisma.hodMessage.upsert({
      where: { department: cleanDept },
      create: {
        department: cleanDept,
        name: cleanName,
        designation: cleanDesig,
        message: cleanMsg,
        image: image || null,
        imagePublicId: imagePublicId || null,
      },
      update: {
        name: cleanName,
        designation: cleanDesig,
        message: cleanMsg,
        ...(image !== undefined && { image: image || null }),
        ...(imagePublicId !== undefined && { imagePublicId: imagePublicId || null }),
      },
    });

    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHodMessage = async (req: Request, res: Response) => {
  try {
    const raw = req.params.deptOrId;
    const deptOrId = (Array.isArray(raw) ? raw[0] : raw) || '';
    if (!deptOrId.trim()) {
      return res.status(400).json({ message: 'Department or ID is required' });
    }

    const clean = deptOrId.trim().toUpperCase();
    let existing = await prisma.hodMessage.findUnique({
      where: { department: clean },
    });

    if (!existing && clean.length === 24) {
      existing = await prisma.hodMessage.findUnique({
        where: { id: clean.toLowerCase() },
      });
    }

    if (!existing) {
      return res.status(404).json({ message: 'HOD message not found' });
    }

    if (existing.imagePublicId) {
      await deleteMediaAsset(existing.image, existing.imagePublicId, 'image');
    }

    await prisma.hodMessage.delete({
      where: { id: existing.id },
    });

    res.json({ message: `HOD message for ${existing.department} deleted successfully` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== CONTACT MESSAGES ====================
export const submitContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'All fields (name, email, subject, message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    res.status(201).json({ message: 'Contact message submitted successfully', data: newMessage });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to submit contact message' });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    await prisma.contactMessage.delete({
      where: { id },
    });
    res.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMultipleMessages = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Valid array of message IDs is required.' });
    }

    const result = await prisma.contactMessage.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    res.json({ message: `${result.count} message(s) deleted successfully`, count: result.count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== HERO SLIDES & BANNERS ====================

// Public: Get all active hero slides sorted by order then createdAt
export const getPublicHeroSlides = async (req: Request, res: Response) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    res.json(slides);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all hero slides (both active and inactive)
export const getAllHeroSlidesAdmin = async (req: Request, res: Response) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    res.json(slides);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Create a new hero slide
export const createHeroSlide = async (req: Request, res: Response) => {
  try {
    const {
      title,
      subtitle,
      description,
      badge,
      badgeColor,
      bgImage,
      bgImagePublicId,
      primaryBtnText,
      primaryBtnLink,
      secondaryBtnText,
      secondaryBtnLink,
      eventDate,
      venue,
      qrCodeImage,
      qrCodePublicId,
      order,
      isActive,
    } = req.body;

    if (!title || !description || !bgImage) {
      return res.status(400).json({ message: 'Title, description, and background image are required.' });
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title: title.trim(),
        subtitle: subtitle?.trim() || null,
        description: description.trim(),
        badge: badge?.trim() || 'Special Announcement',
        badgeColor: badgeColor || 'blue',
        bgImage,
        bgImagePublicId: bgImagePublicId || null,
        primaryBtnText: primaryBtnText?.trim() || null,
        primaryBtnLink: primaryBtnLink?.trim() || null,
        secondaryBtnText: secondaryBtnText?.trim() || null,
        secondaryBtnLink: secondaryBtnLink?.trim() || null,
        eventDate: eventDate?.trim() || null,
        venue: venue?.trim() || null,
        qrCodeImage: qrCodeImage || null,
        qrCodePublicId: qrCodePublicId || null,
        order: typeof order === 'number' ? order : Number(order) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    res.status(201).json(slide);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update an existing hero slide
export const updateHeroSlide = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const existing = await prisma.heroSlide.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: 'Hero slide not found.' });
    }

    const {
      title,
      subtitle,
      description,
      badge,
      badgeColor,
      bgImage,
      bgImagePublicId,
      primaryBtnText,
      primaryBtnLink,
      secondaryBtnText,
      secondaryBtnLink,
      eventDate,
      venue,
      qrCodeImage,
      qrCodePublicId,
      order,
      isActive,
    } = req.body;

    // Clean up old background image from Cloudinary if replaced
    if (bgImagePublicId && existing.bgImagePublicId && bgImagePublicId !== existing.bgImagePublicId) {
      await deleteMediaAsset(existing.bgImage, existing.bgImagePublicId, 'image');
    }

    // Clean up old QR code from Cloudinary if replaced
    if (qrCodePublicId && existing.qrCodePublicId && qrCodePublicId !== existing.qrCodePublicId) {
      await deleteMediaAsset(existing.qrCodeImage, existing.qrCodePublicId, 'image');
    }

    const updated = await prisma.heroSlide.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : existing.title,
        subtitle: subtitle !== undefined ? (subtitle ? subtitle.trim() : null) : existing.subtitle,
        description: description !== undefined ? description.trim() : existing.description,
        badge: badge !== undefined ? (badge ? badge.trim() : null) : existing.badge,
        badgeColor: badgeColor !== undefined ? badgeColor : existing.badgeColor,
        bgImage: bgImage !== undefined ? bgImage : existing.bgImage,
        bgImagePublicId: bgImagePublicId !== undefined ? bgImagePublicId : existing.bgImagePublicId,
        primaryBtnText: primaryBtnText !== undefined ? (primaryBtnText ? primaryBtnText.trim() : null) : existing.primaryBtnText,
        primaryBtnLink: primaryBtnLink !== undefined ? (primaryBtnLink ? primaryBtnLink.trim() : null) : existing.primaryBtnLink,
        secondaryBtnText: secondaryBtnText !== undefined ? (secondaryBtnText ? secondaryBtnText.trim() : null) : existing.secondaryBtnText,
        secondaryBtnLink: secondaryBtnLink !== undefined ? (secondaryBtnLink ? secondaryBtnLink.trim() : null) : existing.secondaryBtnLink,
        eventDate: eventDate !== undefined ? (eventDate ? eventDate.trim() : null) : existing.eventDate,
        venue: venue !== undefined ? (venue ? venue.trim() : null) : existing.venue,
        qrCodeImage: qrCodeImage !== undefined ? qrCodeImage : existing.qrCodeImage,
        qrCodePublicId: qrCodePublicId !== undefined ? qrCodePublicId : existing.qrCodePublicId,
        order: order !== undefined ? (typeof order === 'number' ? order : Number(order) || 0) : existing.order,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete a hero slide and clean up images
export const deleteHeroSlide = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const slide = await prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) {
      return res.status(404).json({ message: 'Hero slide not found.' });
    }

    // Clean up Cloudinary assets
    if (slide.bgImagePublicId) {
      await deleteMediaAsset(slide.bgImage, slide.bgImagePublicId, 'image');
    }
    if (slide.qrCodePublicId) {
      await deleteMediaAsset(slide.qrCodeImage, slide.qrCodePublicId, 'image');
    }

    await prisma.heroSlide.delete({ where: { id } });
    res.json({ message: 'Hero slide deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Toggle active status
export const toggleHeroSlideStatus = async (req: Request, res: Response) => {
  try {
    const id = getParamId(req);
    const slide = await prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) {
      return res.status(404).json({ message: 'Hero slide not found.' });
    }

    const updated = await prisma.heroSlide.update({
      where: { id },
      data: { isActive: !slide.isActive },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};




