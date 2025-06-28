import express from 'express';
import authRouter from './features/auth/auth.routes.js'
import profileRouter from './features/userProfile/userProfile.routes.js'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

export default router;