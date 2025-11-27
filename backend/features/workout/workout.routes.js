import express from "express";
import * as workoutController from "./workout.controller.js";
import { authorizeRoles } from "../../middlewares/authorizeRoles.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("ADMIN", "TRAINER"), workoutController.createWorkout);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN", "TRAINER"), workoutController.updateWorkout);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN", "TRAINER"), workoutController.deleteWorkout);

router.get("/", authMiddleware, authorizeRoles("ADMIN", "TRAINER", "MEMBER"), workoutController.getAllWorkouts);

router.post("/:id/save",
  authMiddleware,
  authorizeRoles("MEMBER"),
  workoutController.saveWorkout
);

router.get("/saved/me",
  authMiddleware,
  authorizeRoles("MEMBER"),
  workoutController.getSavedWorkouts
);

router.post(
  "/progress",
  authMiddleware,
  authorizeRoles("MEMBER"),
  workoutController.completeWorkout
);

router.delete("/:id/save", authMiddleware, authorizeRoles("MEMBER"), workoutController.unsaveWorkout);

router.get(
  "/progress/:routineId",
  authMiddleware,
  authorizeRoles("MEMBER"),
  workoutController.getWorkoutProgress
);

router.get("/:id", authMiddleware, authorizeRoles("ADMIN", "TRAINER", "MEMBER"), workoutController.getWorkoutById);
export default router;
