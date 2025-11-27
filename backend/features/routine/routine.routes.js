import express from "express";
import * as routineController from "./routine.controller.js";

import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeRoles } from "../../middlewares/authorizeRoles.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", authorizeRoles("ADMIN", "TRAINER", "MEMBER"), routineController.createRoutine);

router.get("/", routineController.getAllRoutines);

router.get("/:id", routineController.getRoutineById);

router.put("/:id", authorizeRoles("ADMIN", "TRAINER", "MEMBER"), routineController.updateRoutine);

router.delete(
  "/:id",
  authorizeRoles("ADMIN", "TRAINER", "MEMBER"),
  routineController.deleteRoutine,
);

router.post(
  "/:id/save",
  authMiddleware,
  authorizeRoles("MEMBER"),
  routineController.saveRoutine,
);

router.get(
  "/saved/me",
  authMiddleware,
  authorizeRoles("MEMBER"),
  routineController.getSavedRoutines,
);

router.post(
  "/:id/complete",
  authMiddleware,
  authorizeRoles("MEMBER"),
  routineController.completeRoutine
);

router.delete(
  "/:id/save",
  authMiddleware,
  authorizeRoles("MEMBER"),
  routineController.unsaveRoutine
);


export default router;
