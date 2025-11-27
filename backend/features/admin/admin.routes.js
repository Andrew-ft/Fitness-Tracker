import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import * as adminController from "./admin.controller.js";
import { adminMiddleware } from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/trainers", adminMiddleware, adminController.createTrainer);
router.get("/trainers", adminMiddleware, adminController.getAllTrainers);
router.get("/trainers/:id", adminMiddleware, adminController.getTrainerById);
router.put("/trainers/:id", adminMiddleware, adminController.updateTrainer);
router.delete("/trainers/:id", adminMiddleware, adminController.deactivateTrainer);

router.post("/members", adminMiddleware, adminController.createMember);
router.get("/members", adminMiddleware, adminController.getAllMembers);
router.get("/members/:id", adminMiddleware, adminController.getMemberById);
router.put("/members/:id", adminMiddleware, adminController.updateMember);
router.delete("/members/:id", adminMiddleware, adminController.deactivateMember);

router.put("/members/:memberId/assign-trainer", adminMiddleware, adminController.assignTrainer);

router.get("/profile", adminMiddleware, adminController.getAdminProfile);
router.put("/profile", adminMiddleware, adminController.updateAdminProfile);
router.get("/dashboard/stats", adminMiddleware, adminController.getDashboardStats);


export default router;
