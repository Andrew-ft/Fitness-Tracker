import { Router } from "express";
import memberController from "./members.controller.js";
import handleErrorMessage from "../../middlewares/handleErrorMessage.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import { body } from "express-validator";

const memberRouter = Router();

memberRouter.use(authMiddleware);
memberRouter.use(roleMiddleware("member"));

// workoutsm routes
memberRouter.get("/workouts", handleErrorMessage, memberController.viewWorkout);
memberRouter.get("/workouts/:id", handleErrorMessage, memberController.viewWorkoutDetails);

// routine routes
memberRouter.post(
  "/routines",
  body("name").notEmpty(),
  body("time").isNumeric(),
  body("caloriesBurned").isNumeric(),
  body("visibility").isIn(["public", "private"]),
  body("workouts").isArray(),
  handleErrorMessage,
  memberController.createRoutine
);

memberRouter.get("/routines", handleErrorMessage, memberController.getAllRoutine);
memberRouter.get("/routines/:id", handleErrorMessage, memberController.getRoutineById);
memberRouter.put("/routines/:id", handleErrorMessage, memberController.updateRoutine);
memberRouter.delete("/routines/:id", handleErrorMessage, memberController.deleteRoutine);


// saved routes
memberRouter.get("/profile/saved-workouts", handleErrorMessage, memberController.getSavedWorkouts);
memberRouter.get("/profile/saved-routines", handleErrorMessage, memberController.getSavedRoutines);

export default memberRouter;
