import express from 'express';
import userRoutes from './features/user/userRoutes.js'

const router = express.Router();

router.use("/users", userRoutes)

export default router;