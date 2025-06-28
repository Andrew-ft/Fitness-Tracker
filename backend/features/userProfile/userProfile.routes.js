import { Router } from 'express';
import userProfileController from './userProfile.controller.js';
import handleErrorMessage from '../../middlewares/handleErrorMessage.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const userProfileRouter = Router();

userProfileRouter.get('/', authMiddleware, handleErrorMessage, userProfileController.getProfile);
userProfileRouter.patch('/', authMiddleware, handleErrorMessage, userProfileController.updateProfile);

export default userProfileRouter;