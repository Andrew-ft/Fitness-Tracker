import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import * as progressController from "./progress.controller.js";

const router = express.Router();

router.post("/:routineId/start", authMiddleware, progressController.startRoutine);
router.post("/:routineId/finish", authMiddleware, progressController.finishRoutine);
router.get("/:routineId", authMiddleware, progressController.getRoutineProgress);
router.get("/", authMiddleware, progressController.getAnalytics);
router.get("/member/:memberId", authMiddleware, progressController.getMemberAnalyticsById);

export default router;
