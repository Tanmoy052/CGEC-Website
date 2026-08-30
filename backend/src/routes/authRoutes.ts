import { Router } from 'express';
import { register, login, adminLogin, seedDefaultAdmin } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/seed-admin', seedDefaultAdmin);

export default router;
