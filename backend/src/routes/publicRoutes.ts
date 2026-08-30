import { Router } from 'express';
import {
  getFacultyList,
  getSyllabusList,
  getNoticesList,
  getLabsList,
  getGalleryList,
  getWallMagazineList,
} from '../controllers/adminController';

const router = Router();

// Public Read-Only endpoints
router.get('/faculty', getFacultyList);
router.get('/syllabus', getSyllabusList);
router.get('/notices', getNoticesList);
router.get('/labs', getLabsList);
router.get('/gallery', getGalleryList);
router.get('/wall-magazine', getWallMagazineList);

export default router;
