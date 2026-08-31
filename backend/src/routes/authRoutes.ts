import { Router } from 'express';
import { login, adminLogin } from '../controllers/authController';

const router = Router();

// NOTE: /register and /seed-admin removed — security risk (open role assignment & seed exposure)
router.post('/login', login);
router.post('/admin-login', adminLogin);

export default router;
