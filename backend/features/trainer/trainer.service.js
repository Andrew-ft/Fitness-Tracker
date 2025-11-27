import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

export const getTrainerProfile = async (userId) => {
  const trainer = await prisma.trainer.findFirst({
    where: { user: { userId } },
    include: { user: true }
  });
  if (!trainer) throw new Error("Trainer not found");
  return trainer;
};

export const updateTrainerProfile = async (userId, data) => {
  const { user, certificate, specialization, experiencedYears, clientTypes } = data;

  const trainer = await prisma.trainer.findFirst({
    where: { user: { userId } }
  });

  if (!trainer) throw new Error("Trainer not found");

  const userUpdateData = { ...user };
  if (user && user.password) {
    userUpdateData.password = await bcrypt.hash(user.password, 10);
  }

  return await prisma.trainer.update({
    where: { trainerId: trainer.trainerId },
    data: {
      certificate,
      specialization,
      experiencedYears,
      clientTypes,
      user: { update: userUpdateData }
    },
    include: { user: true }
  });
};


export const getAssignedMembers = async (userId) => {
  const trainer = await prisma.trainer.findFirst({
    where: { user: { userId } },
    include: { members: { include: { user: true, progress: true } } }
  });
  if (!trainer) throw new Error("Trainer not found");
  return trainer.members;
};

export const getAssignedMemberById = async (userId, memberId) => {
  const member = await prisma.member.findFirst({
    where: { memberId: Number(memberId), trainer: { user: { userId } } },
    include: { user: true, progress: true }
  });
  if (!member) throw new Error("Member not found or not assigned to this trainer");
  return member;
};

export const getMemberProgress = async (userId, memberId) => {
  const member = await getAssignedMemberById(userId, memberId);
  return member.progress;
};

export const getTrainerDashboardStats = async (userId) => {
  const trainer = await prisma.trainer.findFirst({
    where: { trainerId: userId },
    include: { members: { include: { progress: true, user: true } } }
  });

  if (!trainer) throw new Error("Trainer not found");

  const routines = await prisma.routine.findMany({ where: { createdById: userId } });

  const completedRoutines = trainer.members.reduce((acc, member) => {
    const completedCount = member.progress.filter(p => p.isCompleted).length;
    acc.total += completedCount;
    return acc;
  }, { total: 0 }).total;

const memberProgressData = trainer.members.map(member => ({
  name: member.user.userName,
  completed: member.progress.length, 
}));


  return {
    totalMembers: trainer.members.length,
    routinesCreated: routines.length,
    totalWorkouts: await prisma.workout.count(),
    totalMembersInSystem: await prisma.member.count(),
    completedRoutines,
    memberProgressData, 
  };
};
