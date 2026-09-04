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
  getAdmissionData,
  createAdmissionItem,
  updateAdmissionItem,
  deleteAdmissionItem,
  updateAdmissionConfig,
  updateAdmissionYear,
  getFeeItems,
  createFeeItem,
  updateFeeItem,
  deleteFeeItem,
  getCommitteeMembers,
  createCommitteeMember,
  updateCommitteeMember,
  deleteCommitteeMember,
  getLeadershipMessages,
  createLeadershipMessage,
  updateLeadershipMessage,
  deleteLeadershipMessage,
  getRecruiters,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getPlacementBrochures,
  createPlacementBrochure,
  updatePlacementBrochure,
  deletePlacementBrochure,
} from '../controllers/adminController';

import multer from 'multer';
import { uploadMediaToCloudinary } from '../controllers/uploadController';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max for brochures/documents
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

// Admission 2025 & Config
router.get('/admission', getAdmissionData);
router.post('/admission/items', createAdmissionItem);
router.put('/admission/items/:id', updateAdmissionItem);
router.delete('/admission/items/:id', deleteAdmissionItem);
router.put('/admission/config', updateAdmissionConfig);
router.put('/admission/year', updateAdmissionYear);

// Fees Structure
router.get('/fees', getFeeItems);
router.post('/fees', createFeeItem);
router.put('/fees/:id', updateFeeItem);
router.delete('/fees/:id', deleteFeeItem);

// Committees
router.get('/committees', getCommitteeMembers);
router.post('/committees', createCommitteeMember);
router.put('/committees/:id', updateCommitteeMember);
router.delete('/committees/:id', deleteCommitteeMember);

// Leadership Messages
router.get('/leadership', getLeadershipMessages);
router.post('/leadership', createLeadershipMessage);
router.put('/leadership/:id', updateLeadershipMessage);
router.delete('/leadership/:id', deleteLeadershipMessage);

// Recruiters
router.get('/recruiters', getRecruiters);
router.post('/recruiters', createRecruiter);
router.put('/recruiters/:id', updateRecruiter);
router.delete('/recruiters/:id', deleteRecruiter);

// Placement Brochure
router.get('/brochures', getPlacementBrochures);
router.post('/brochures', createPlacementBrochure);
router.put('/brochures/:id', updatePlacementBrochure);
router.delete('/brochures/:id', deletePlacementBrochure);

export default router;

