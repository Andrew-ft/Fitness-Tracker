import express from 'express';
import authRouter from './features/auth/auth.routes.js'
import adminRouter from './features/admin/admin.routes.js'
import trainerRouter from './features/trainer/trainer.routes.js'
import memberRouter from './features/members/member.routes.js'
import workoutRouter from './features/workout/workout.routes.js'
import routineRouter from './features/routine/routine.routes.js'
import progressRouter from './features/progress/progress.routes.js'
import chatRouter from './features/chat/chat.routes.js'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/trainer', trainerRouter);
router.use('/member', memberRouter);
router.use('/workout', workoutRouter);
router.use('/routine', routineRouter);
router.use('/progress', progressRouter);
router.use('/chat', chatRouter);

export default router;