import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";

// TRAINER 
export const createTrainer = async (data) => {
  const {
    userName,
    email,
    password,
    gender,
    phoneNumber,
    certificate,
    specialization,
    experiencedYears,
    clientTypes,
  } = data;

  const hashedPassword = await bcrypt.hash(password, 10); 

  return await prisma.trainer.create({
    data: {
      certificate,
      specialization,
      experiencedYears,
      clientTypes,
      user: {
        create: {
          userName,
          email,
          password: hashedPassword,
          gender,
          phoneNumber,
          role: "TRAINER",
        },
      },
    },
    include: { user: true },
  });
};

export const getAllTrainers = async () => {
  return await prisma.trainer.findMany({
    include: {
      user: true,
      members: {
        include: {
          user: true,
          progress: true,
          savedWorkouts: true,
          savedRoutines: true,
        },
      },
    },
  });
};

export const getTrainerById = async (id) => {
  return await prisma.trainer.findUnique({
    where: { trainerId: Number(id) },
    include: {
      user: true,
      members: { include: { user: true, progress: true } },
    },
  });
};

export const updateTrainer = async (id, data) => {
  const { certificate, specialization, experiencedYears, clientTypes, user } = data;

  const userUpdateData = { ...user };

  if (user && user.password) {
    userUpdateData.password = await bcrypt.hash(user.password, 10); 
  }

  return await prisma.trainer.update({
    where: { trainerId: Number(id) },
    data: {
      certificate,
      specialization,
      experiencedYears,
      clientTypes,
      user: { update: userUpdateData },
    },
    include: { user: true },
  });
};

export const deactivateTrainer = async (id) => {
  const trainer = await prisma.trainer.findUnique({
    where: { trainerId: Number(id) },
    include: { user: true },
  });
  if (!trainer) throw new Error("Trainer not found");
  return trainer;
};

// MEMBER 
export const createMember = async (data) => {
  const { userName, email, password, gender, phoneNumber, goal, medicalNotes, trainerId } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.member.create({
    data: {
      goal,
      medicalNotes,
      trainer: trainerId ? { connect: { trainerId: Number(trainerId) } } : undefined,
      user: {
        create: {
          userName,
          email,
          password: hashedPassword,
          gender,
          phoneNumber,
          role: "MEMBER",
        },
      },
    },
    include: { user: true, trainer: { include: { user: true } } },
  });
};


export const getAllMembers = async () => {
  return await prisma.member.findMany({
    include: {
      user: true,
      trainer: { include: { user: true } },
      progress: true,
      savedWorkouts: true,
      savedRoutines: true,
    },
  });
};

export const getMemberById = async (id) => {
  return await prisma.member.findUnique({
    where: { memberId: Number(id) },
    include: {
      user: true,
      trainer: { include: { user: true } },
      progress: true,
    },
  });
};

export const updateMember = async (id, data) => {
  const { goal, medicalNotes, trainerId, user } = data;

  const userUpdateData = { ...user };
  if (user && user.password) userUpdateData.password = await bcrypt.hash(user.password, 10);

  return await prisma.member.update({
    where: { memberId: Number(id) },
    data: {
      goal,
      medicalNotes,
      trainer: trainerId ? { connect: { trainerId: Number(trainerId) } } : undefined,
      user: { update: userUpdateData },
    },
    include: { user: true, trainer: { include: { user: true } } },
  });
};


export const deactivateMember = async (id) => {
  const member = await prisma.member.findUnique({
    where: { memberId: Number(id) },
    include: { user: true },
  });
  if (!member) throw new Error("Member not found");
  return member;
};

export const assignTrainerToMember = async (memberId, trainerId) => {
  const member = await prisma.member.findUnique({ where: { memberId: Number(memberId) } });
  if (!member) throw new Error("Member not found");

  if (trainerId !== null && trainerId !== undefined) {
    const trainer = await prisma.trainer.findUnique({ where: { trainerId: Number(trainerId) } });
    if (!trainer) throw new Error("Trainer not found");
  }

  return await prisma.member.update({
    where: { memberId: Number(memberId) },
    data: { trainerId: trainerId ? Number(trainerId) : null },
    include: { trainer: { include: { user: true } }, user: true }, 
  });
};

// ADMIN PROFILE 
export const getAdminProfile = async (adminId) => {
  const admin = await prisma.user.findUnique({
    where: { userId: Number(adminId) },
    select: { userId: true, userName: true, email: true, role: true, dateOfBirth: true, gender: true, bio: true, phoneNumber: true },
  });
  if (!admin) throw new Error("Admin not found");
  return admin;
};

export const updateAdminProfile = async (adminId, data) => {
  if (data.password) data.password = await bcrypt.hash(data.password, 10);

  return await prisma.user.update({
    where: { userId: Number(adminId) },
    data,
    select: { userId: true, userName: true, email: true, role: true, dateOfBirth: true, gender: true, bio: true, phoneNumber: true },
  });
};


export const getDashboardStats = async () => {
  const totalMembers = await prisma.member.count();
  const activeTrainers = await prisma.trainer.count();
  const routines = await prisma.routine.count();
  const workouts = await prisma.workout.count();

  const totalUsers = totalMembers + activeTrainers;


  const members = await prisma.member.findMany({
    select: { createdAt: true },
  });


  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const memberGrowthMap = {};
  monthNames.forEach((m) => memberGrowthMap[m] = 0);


  members.forEach((m) => {
    const month = monthNames[new Date(m.createdAt).getMonth()];
    memberGrowthMap[month] += 1;
  });

  const memberGrowth = monthNames.map((month) => ({
    month,
    members: memberGrowthMap[month],
  }));

  return { totalMembers, activeTrainers, routines, workouts, memberGrowth, totalUsers, totalRoutines: routines};
};