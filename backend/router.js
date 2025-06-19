import express from 'express';
import userRoutes from './features/user/userRoutes.js'
import trainerRoutes from './features/trainer/trainerRoutes.js'

const router = express.Router();

router.use("/users", userRoutes);
router.use("/trainers", trainerRoutes);

export default router;