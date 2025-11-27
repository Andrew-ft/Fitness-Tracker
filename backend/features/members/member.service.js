import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

export const getMemberProfile = async (userId) => {
  const member = await prisma.member.findFirst({
    where: { user: { userId } },
    include: {
      user: true,
      trainer: {
        include: {
          user: true,
          members: true,
        },
      },
      progress: true,
      savedWorkouts: true,
      savedRoutines: true,
    },
  });

  if (!member) throw new Error("Member not found");
  return member;
};


export const updateMemberProfile = async (userId, data) => {
  const userUpdateData = {};
  if (data.userName) userUpdateData.userName = data.userName;
  if (data.email) userUpdateData.email = data.email;
  if (data.phoneNumber) userUpdateData.phoneNumber = data.phoneNumber;
  if (data.dateOfBirth) userUpdateData.dateOfBirth = new Date(data.dateOfBirth);
  if (data.gender) userUpdateData.gender = data.gender;
  if (data.bio) userUpdateData.bio = data.bio;

  const member = await prisma.member.findFirst({
    where: { user: { userId } },
  });

  if (!member) throw new Error("Member not found");

  const updated = await prisma.member.update({
    where: { memberId: member.memberId },
    data: {
      goal: data.goal,
      medicalNotes: data.medicalNotes,
      user: { update: userUpdateData },
    },
    include: {
      user: true,
      trainer: {
        include: {
          user: true,
          members: true,
        },
      },
      progress: true,
      savedWorkouts: true,
      savedRoutines: true,
    },
  });

  return updated;
};


export const getAssignedTrainer = async (userId) => {
  const member = await prisma.member.findFirst({
    where: { user: { userId } },
    include: {
      trainer: {
        include: {
          user: true,
          members: true,
        },
      },
    },
  });

  if (!member) throw new Error("Member not found");
  if (!member.trainer) throw new Error("No trainer assigned");

  return member.trainer;
};


export const getMemberProgress = async (userId) => {
  const member = await prisma.member.findFirst({
    where: { user: { userId } },
    include: { progress: true },
  });

  if (!member) throw new Error("Member not found");
  return member.progress;
};

export const getSavedWorkouts = async (userId) => {
  const member = await prisma.member.findFirst({
    where: { user: { userId } },
    include: { savedWorkouts: true },
  });

  if (!member) throw new Error("Member not found");
  return member.savedWorkouts;
};

export const getSavedRoutines = async (userId) => {
  const member = await prisma.member.findFirst({
    where: { user: { userId } },
    include: { savedRoutines: true },
  });

  if (!member) throw new Error("Member not found");
  return member.savedRoutines;
};

export const getMemberDashboardStats = async (userId) => {
  const member = await prisma.member.findFirst({
    where: { user: { userId } },
    include: {
      progress: true,
      savedWorkouts: true,
      savedRoutines: true,
    },
  });

  if (!member) throw new Error("Member not found");

  const routineCreated = await prisma.routine.count({
    where: { createdById: userId },
  });

  const savedWorkoutsCount = member.savedWorkouts.length;

  const savedRoutinesCount = member.savedRoutines.length;

  const completedDates = member.progress
    .filter((p) => p.isCompleted && p.completedAt)
    .map((p) => new Date(p.completedAt))
    .sort((a, b) => b - a);

  let streak = 0;
  if (completedDates.length > 0) {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    for (const date of completedDates) {
      const diffDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
  }

  return {
    routineCreated,
    streak,
    savedWorkouts: savedWorkoutsCount,
    savedRoutines: savedRoutinesCount,
  };
};