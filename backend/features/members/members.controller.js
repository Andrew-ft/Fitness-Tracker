import memberService from "./members.service.js";

// workout section
const viewWorkout = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      muscleGroup,
      subMuscleGroup,
      difficulty,
    } = req.query;
    const workouts = await memberService.viewWorkout({
      page: Number(page),
      limit: Number(limit),
      muscleGroup,
      subMuscleGroup,
      difficulty,
    });

    if (workouts.data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No workouts found" });
    }
    return res.status(200).json({ success: true, ...workouts });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const viewWorkoutDetails = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const workout = await memberService.viewWorkoutDetails(workoutId);
    return res.status(200).json({ success: true, workout });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

// routine section
const createRoutine = async (req, res) => {
  try {
    const userId = req.userId;
    const routineData = req.body;
    const routine = await memberService.createRoutine(
      routineData,
      userId
    );
    res.status(201).json({
      success: true,
      message: "Routine created successfully",
      routine,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const updateRoutine = async (req, res) => {
  try {
    const userId = req.userId;
    const routineId = req.params.id;
    const updateData = req.body;
    const routine = await memberService.updateRoutine(
      routineId,
      userId,
      updateData
    );
    res.status(200).json({
      success: true,
      message: "Routine updated successfully",
      routine,
    });
  } catch (e) {
    console.error(e.message);
    res.status(403).json({ error: e.message });
  }
};

const deleteRoutine = async (req, res) => {
  try {
    const userId = req.userId;
    const routineId = req.params.id;
    const result = await memberService.deleteRoutine(routineId, userId);
    res.status(200).json({
      success: true,
      message: "Routine deleted successfully",
      ...result,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const getAllRoutine = async (req, res) => {
  try {
    const userId = req.userId;
    const routines = await memberService.getRoutine(userId);

    if (routines.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No routines found" });
    }
    return res.status(200).json({
      success: true,
      routines,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const getRoutineById = async (req, res) => {
  try {
    const userId = req.userId;
    const routineId = req.params.id;
    const routine = await memberService.getRoutineById(
      routineId,
      userId
    );
    res.status(200).json({
      success: true,
      routine,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

// getting saved workouts and routines
const getSavedWorkouts = async (req, res) => {
  try {
    const userId = req.userId;
    const workouts = await memberService.getSavedWorkouts(userId);
    if (workouts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No saved workouts found" });
    }
    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const getSavedRoutines = async (req, res) => {
  try {
    const userId = req.userId;
    const routines = await memberService.getSavedRoutines(userId);
    if (routines.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No saved routines found" });
    }
    return res.status(200).json({
      success: true,
      routines,
    });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const memberController = {
  viewWorkout,
  viewWorkoutDetails,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutine,
  getRoutineById,
  getSavedWorkouts,
  getSavedRoutines,
};

export default memberController;
