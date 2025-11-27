import * as memberService from "./member.service.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await memberService.getMemberProfile(req.user.id);
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await memberService.updateMemberProfile(req.user.id, req.body);
    res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getTrainer = async (req, res) => {
  try {
    const trainer = await memberService.getAssignedTrainer(req.user.id);
    res.status(200).json({ success: true, trainer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const progress = await memberService.getMemberProgress(req.user.id);
    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getSavedWorkouts = async (req, res) => {
  try {
    const workouts = await memberService.getSavedWorkouts(req.user.id);
    res.status(200).json({ success: true, workouts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getSavedRoutines = async (req, res) => {
  try {
    const routines = await memberService.getSavedRoutines(req.user.id);
    res.status(200).json({ success: true, routines });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await memberService.getMemberDashboardStats(req.user.id);
    res.status(200).json({ success: true, stats });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};