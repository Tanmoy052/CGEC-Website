import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import {
  getStats,
  getFacultyList,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getSyllabusList,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
  getNoticesList,
  createNotice,
  updateNotice,
  deleteNotice,
  getLabsList,
  createLab,
  updateLab,
  deleteLab,
  getGalleryList,
  createGalleryItem,
  deleteGalleryItem,
  getAdminProfile,
  updateAdminProfile,
  getWallMagazineList,
  createWallMagazine,
  updateWallMagazine,
  deleteWallMagazine,
} from '../controllers/adminController';

import multer from 'multer';
import { uploadMediaToCloudinary } from '../controllers/uploadController';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30 MB max
});

const router = Router();

// Protect and authorize all routes in this router for ADMIN
router.use(protect, authorize('ADMIN'));

// Cloudinary Media & Document Upload
router.post('/upload', upload.single('file'), uploadMediaToCloudinary);

// Stats
router.get('/stats', getStats);

// Profile / Account & Security
router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);

// Faculty
router.get('/faculty', getFacultyList);
router.post('/faculty', createFaculty);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

// Syllabus & PDFs
router.get('/syllabus', getSyllabusList);
router.post('/syllabus', createSyllabus);
router.put('/syllabus/:id', updateSyllabus);
router.delete('/syllabus/:id', deleteSyllabus);

// Notices
router.get('/notices', getNoticesList);
router.post('/notices', createNotice);
router.put('/notices/:id', updateNotice);
router.delete('/notices/:id', deleteNotice);

// Labs
router.get('/labs', getLabsList);
router.post('/labs', createLab);
router.put('/labs/:id', updateLab);
router.delete('/labs/:id', deleteLab);

// Gallery
router.get('/gallery', getGalleryList);
router.post('/gallery', createGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

// Wall Magazine
router.get('/wall-magazine', getWallMagazineList);
router.post('/wall-magazine', createWallMagazine);
router.put('/wall-magazine/:id', updateWallMagazine);
router.delete('/wall-magazine/:id', deleteWallMagazine);

export default router;
