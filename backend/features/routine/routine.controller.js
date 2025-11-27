import * as routineService from "./routine.service.js";
import prisma from "../../config/prisma.js";

// Create routine
export const createRoutine = async (req, res) => {
  try {
    const routine = await routineService.createRoutine(
      req.body,        
      req.user.id,
      req.user.role,
    );
    res.status(201).json({ success: true, routine });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all routines
export const getAllRoutines = async (req, res) => {
  try {
    const routines = await routineService.getAllRoutines(
      req.user.id,
      req.user.role,
    );
    res.status(200).json({ success: true, routines });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get routine by ID
export const getRoutineById = async (req, res) => {
  try {
    const routine = await routineService.getRoutineById(
      req.params.id,
      req.user.id,
      req.user.role,
    );
    res.status(200).json({ success: true, routine });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

// Update routine
export const updateRoutine = async (req, res) => {
  try {
    const routine = await routineService.updateRoutine(
      req.params.id,
      req.body,        
      req.user.id,
      req.user.role,
    );
    res.status(200).json({ success: true, routine });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete routine
export const deleteRoutine = async (req, res) => {
  try {
    await routineService.deleteRoutine(
      req.params.id,
      req.user.id,
      req.user.role,
    );
    res.status(200).json({
      success: true,
      message: "Routine deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Save routine
export const saveRoutine = async (req, res) => {
  try {
    if (req.user.role !== "MEMBER") 
      throw new Error("Only members can save routines");

    const memberId = req.user.id; 
    const routineId = req.params.id;

    const saved = await routineService.saveRoutine(memberId, routineId);

    res.status(201).json({ success: true, saved });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message || "Failed to save routine" 
    });
  }
};

// Get saved routines
export const getSavedRoutines = async (req, res) => {
  try {
    if (req.user.role !== "MEMBER") 
      throw new Error("Only members can view saved routines");

    const memberId = req.user.id;

    const saved = await routineService.getSavedRoutines(memberId);
    res.status(200).json({ success: true, saved });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Complete routine
export const completeRoutine = async (req, res) => {
  try {
    const memberId = req.user.memberId;
    if (!memberId) throw new Error("Only members can complete routines");

    const routineId = req.params.id;
    const { completedWorkouts } = req.body;

    const completed = await routineService.completeRoutine(
      memberId,
      routineId,
      completedWorkouts
    );

    res.status(200).json({
      success: true,
      message: "Routine completed successfully",
      completed,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const unsaveRoutine = async (req, res) => {
  try {
    if (req.user.role !== "MEMBER") 
      throw new Error("Only members can unsave routines");

    const memberId = req.user.id; 
    const routineId = req.params.id;

    const unsaved = await routineService.unsaveRoutine(memberId, routineId);

    res.status(200).json({ success: true, unsaved });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message || "Failed to unsave routine" 
    });
  }
};