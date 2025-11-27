import * as adminService from "./admin.service.js";

// TRAINER 
export const createTrainer = async (req, res) => {
  try {
    const trainer = await adminService.createTrainer(req.body);
    return res.status(201).json({ success: true, trainer });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await adminService.getAllTrainers();
    return res.status(200).json({ success: true, trainers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getTrainerById = async (req, res) => {
  try {
    const trainer = await adminService.getTrainerById(Number(req.params.id));
    if (!trainer) return res.status(404).json({ success: false, error: "Trainer not found" });
    return res.status(200).json({ success: true, trainer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateTrainer = async (req, res) => {
  try {
    const updatedTrainer = await adminService.updateTrainer(Number(req.params.id), req.body);
    return res.status(200).json({ success: true, trainer: updatedTrainer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deactivateTrainer = async (req, res) => {
  try {
    const trainer = await adminService.deactivateTrainer(Number(req.params.id));
    return res.status(200).json({ success: true, message: "Trainer deactivated", trainer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// MEMBER 
export const createMember = async (req, res) => {
  try {
    const member = await adminService.createMember(req.body);
    return res.status(201).json({ success: true, member });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await adminService.getAllMembers();
    return res.status(200).json({ success: true, members });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await adminService.getMemberById(Number(req.params.id));
    if (!member) return res.status(404).json({ success: false, error: "Member not found" });
    return res.status(200).json({ success: true, member });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const updatedMember = await adminService.updateMember(Number(req.params.id), req.body);
    return res.status(200).json({ success: true, member: updatedMember });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deactivateMember = async (req, res) => {
  try {
    const member = await adminService.deactivateMember(Number(req.params.id));
    return res.status(200).json({ success: true, message: "Member deactivated", member });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const assignTrainer = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { trainerId } = req.body;

    const updatedMember = await adminService.assignTrainerToMember(
      Number(memberId),
      trainerId !== null ? Number(trainerId) : null
    );

    const action = trainerId ? "assigned" : "unassigned";

    return res.status(200).json({
      success: true,
      message: `Trainer ${action} successfully`,
      member: updatedMember,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error: error.message });
  }
};


// ADMIN PROFILE 
export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const profile = await adminService.getAdminProfile(adminId);
    return res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const updatedProfile = await adminService.updateAdminProfile(adminId, req.body);
    return res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error: error.message });
  }
};


export const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();
    return res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};