import express from "express";
import { trainerMiddleware } from "../../middlewares/trainerMiddleware.js";
import * as trainerController from "./trainer.controller.js";

const router = express.Router();

router.get("/profile", trainerMiddleware, trainerController.getProfile);
router.put("/profile", trainerMiddleware, trainerController.updateProfile);

router.get("/members", trainerMiddleware, trainerController.getMembers);
router.get("/members/:id", trainerMiddleware ,trainerController.getMemberById);
router.get("/members/:id/progress", trainerMiddleware, trainerController.getMemberProgress);
router.get("/dashboard-stats", trainerMiddleware, trainerController.getDashboardStats);

export default router;