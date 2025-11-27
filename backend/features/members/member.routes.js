import express from "express";
import { memberMiddleware } from "../../middlewares/memberMiddleware.js";
import * as memberController from "./member.controller.js";

const router = express.Router();

router.get("/profile", memberMiddleware, memberController.getProfile);
router.put("/profile", memberMiddleware, memberController.updateProfile);
router.get("/trainer", memberMiddleware, memberController.getTrainer);
router.get("/progress", memberMiddleware, memberController.getProgress);
router.get("/workouts", memberMiddleware, memberController.getSavedWorkouts);
router.get("/routines", memberMiddleware, memberController.getSavedRoutines);
router.get("/dashboard-stats", memberMiddleware, memberController.getDashboardStats);


export default router;