import express from 'express';
import userRoutes from './features/user/userRoutes.js'
import workoutRoutes from './features/workout/workoutRoutes.js'

const router = express.Router();

router.use("/users", userRoutes);
router.use("/workouts", workoutRoutes);

export default router;