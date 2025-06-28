import userProfileService from "./userProfile.service.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const allowedFields = [
      "fullName",
      "weight",
      "height",
      "bodyFat",
      "waist",
      "chest",
      "arms",
      "legs",
    ];
    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const updateUser = await userProfileService.updateProfile(
      userId,
      updateData
    );
    return res
      .status(200)
      .json({ success: true, message: "User data updated", updateUser });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userProfileService.getProfile(userId);
    return res
      .status(200)
      .json({ success: true, message: "User Profile: ", user });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ error: e.message });
  }
};

const userProfileController = {
  updateProfile,
  getProfile,
};

export default userProfileController;
