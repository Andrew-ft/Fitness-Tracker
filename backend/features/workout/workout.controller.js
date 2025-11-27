import * as workoutService from "./workout.service.js";

export const createWorkout = async (req, res) => {
  try {
    const workout = await workoutService.createWorkout(req.body);
    res.status(201).json({ success: true, workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await workoutService.getAllWorkouts();
    res.status(200).json({ success: true, workouts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await workoutService.getWorkoutById(req.params.id);
    res.status(200).json({ success: true, workout });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const workout = await workoutService.updateWorkout(req.params.id, req.body);
    res.status(200).json({ success: true, workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    await workoutService.deleteWorkout(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Workout deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const saveWorkout = async (req, res) => {
  try {
    const memberId = req.user.id;
    if (!memberId) throw new Error("Only members can save workouts");

    const workoutId = req.params.id;

    const saved = await workoutService.saveWorkout(memberId, workoutId);

    res.status(201).json({ success: true, saved });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getSavedWorkouts = async (req, res) => {
  try {
    const memberId = req.user.id;
    if (!memberId) throw new Error("Only members can view saved workouts");

    const saved = await workoutService.getSavedWorkouts(memberId);

    res.status(200).json({ success: true, saved });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Complete a workout (MEMBER only)
export const completeWorkout = async (req, res) => {
  try {
    const memberId = req.user.id;
    if (!memberId) throw new Error("Only members can complete workouts");

    const { workoutId, routineId } = req.body; // workoutId and routineId from frontend
    const progress = await workoutService.completeWorkout(memberId, workoutId, routineId);

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get workout progress for a routine (MEMBER only)
export const getWorkoutProgress = async (req, res) => {
  try {
    const memberId = req.user.id;
    if (!memberId) throw new Error("Only members can view progress");

    const { routineId } = req.params;
    const progress = await workoutService.getWorkoutProgress(memberId, routineId);

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const unsaveWorkout = async (req, res) => {
  try {
    const memberId = req.user.id;
    const workoutId = req.params.id;

    const deleted = await workoutService.deleteSavedWorkout(memberId, workoutId);

    if (deleted.count === 0) {
      return res.status(404).json({ success: false, error: "Workout was not saved" });
    }

    res.status(200).json({ success: true, message: "Workout unsaved successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
