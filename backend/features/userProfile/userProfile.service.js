import prisma from "../../config/prisma.js";

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      assignedTrainerId: true,
      assignedTrainer: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      weight: true,
      height: true,
      bodyFat: true,
      waist: true,
      chest: true,
      arms: true,
      legs: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateProfile = async (userId, updateData) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      fullName: true,
      weight: true,
      height: true,
      bodyFat: true,
      waist: true,
      chest: true,
      arms: true,
      legs: true,
    },
  });
  return user;
};

const userProfileService = {
  getProfile,
  updateProfile,
};

export default userProfileService;
