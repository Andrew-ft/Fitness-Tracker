import * as trainerService from "./trainer.service.js";

export const getProfile = async (req, res) => {
  try {
    const trainerUserId = req.user.id;
    const profile = await trainerService.getTrainerProfile(trainerUserId);
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const trainerUserId = req.user.id;
    const updatedProfile = await trainerService.updateTrainerProfile(trainerUserId, req.body);
    res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getMembers = async (req, res) => {
  try {
    const trainerUserId = req.user.id;
    const members = await trainerService.getAssignedMembers(trainerUserId);
    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const trainerUserId = req.user.id;
    const memberId = req.params.id;
    const member = await trainerService.getAssignedMemberById(trainerUserId, memberId);
    res.status(200).json({ success: true, member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getMemberProgress = async (req, res) => {
  try {
    const trainerUserId = req.user.id;
    const memberId = req.params.id;
    const progress = await trainerService.getMemberProgress(trainerUserId, memberId);
    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await trainerService.getTrainerDashboardStats(req.user.id);
    res.json({ success: true, stats }); 
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

