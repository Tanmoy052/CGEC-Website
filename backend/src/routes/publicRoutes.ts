import { Router } from 'express';
import {
  getFacultyList,
  getSyllabusList,
  getNoticesList,
  getLabsList,
  getGalleryList,
  getWallMagazineList,
  getAdmissionData,
  getFeeItems,
  getCommitteeMembers,
  getLeadershipMessages,
  getRecruiters,
  getPlacementBrochures,
  getLatestBrochure,
  getBrochureById,
  getHodMessages,
} from '../controllers/adminController';

const router = Router();

// Public Read-Only endpoints
router.get('/faculty', getFacultyList);
router.get('/syllabus', getSyllabusList);
router.get('/notices', getNoticesList);
router.get('/labs', getLabsList);
router.get('/gallery', getGalleryList);
router.get('/wall-magazine', getWallMagazineList);
router.get('/admission', getAdmissionData);
router.get('/fees', getFeeItems);
router.get('/committees', getCommitteeMembers);
router.get('/leadership', getLeadershipMessages);
router.get('/recruiters', getRecruiters);
router.get('/wall-magazine', getWallMagazineList);
router.get('/wall-magazines', getWallMagazineList);
router.get('/brochures', getPlacementBrochures);
router.get('/placement-brochure', getPlacementBrochures);
router.get('/placement-brochures', getPlacementBrochures);
router.get('/brochures/latest', getLatestBrochure);
router.get('/brochures/:id', getBrochureById);
router.get('/hod-message', getHodMessages);
router.get('/hod-messages', getHodMessages);

export default router;
