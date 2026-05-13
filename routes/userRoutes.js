import express from 'express'
import router from './taskRoutes.js';
import { LoginUser, getCurrentUser , RegisterUser, updatePassword, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const Router= express.Router();
router.post('/register',RegisterUser);
router.post('/login',LoginUser);

router.get('/me', getCurrentUser);
router.put('/profile',authMiddleware, updateProfile);
router.put('/password',authMiddleware, updatePassword);
export default router;