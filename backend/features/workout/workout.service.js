import prisma from "../../config/prisma.js";

export const createWorkout = async (data) => {
  return await prisma.workout.create({ data });
};

export const getAllWorkouts = async () => {
  return await prisma.workout.findMany();
};

export const getWorkoutById = async (id) => {
  const workout = await prisma.workout.findUnique({
    where: { workoutId: Number(id) },
  });

  if (!workout) throw new Error("Workout not found");
  return workout;
};

export const updateWorkout = async (id, data) => {
  const workout = await prisma.workout.findUnique({
    where: { workoutId: Number(id) },
  });

  if (!workout) throw new Error("Workout not found");

  return await prisma.workout.update({
    where: { workoutId: Number(id) },
    data,
  });
};

export const deleteWorkout = async (id) => {
  const workout = await prisma.workout.findUnique({
    where: { workoutId: Number(id) },
  });

  if (!workout) throw new Error("Workout not found");

  return await prisma.workout.delete({
    where: { workoutId: Number(id) },
  });
};

export const saveWorkout = async (memberId, workoutId) => {
  const workout = await prisma.workout.findUnique({
    where: { workoutId: Number(workoutId) }
  });
  if (!workout) throw new Error("Workout not found");

  return await prisma.savedWorkouts.create({
    data: {
      memberId,
      workoutId: Number(workoutId)
    }
  });
};

export const getSavedWorkouts = async (memberId) => {
  return await prisma.savedWorkouts.findMany({
    where: { memberId },
    include: { workout: true }
  });
};

export const completeWorkout = async (memberId, workoutId, routineId) => {
  const workout = await prisma.workout.findUnique({
    where: { workoutId: Number(workoutId) },
  });
  if (!workout) throw new Error("Workout not found");

  const now = new Date();

  const progress = await prisma.progress.upsert({
    where: {
      userId_routineId_workoutId: {
        userId: memberId,
        routineId: Number(routineId),
        workoutId: Number(workoutId),
      },
    },
    update: { isCompleted: true, completedAt: now },
    create: {
      userId: memberId,
      routineId: Number(routineId),
      workoutId: Number(workoutId),
      isCompleted: true,
      completedAt: now,
    },
  });

  return progress;
};

export const getWorkoutProgress = async (memberId, routineId) => {
  return await prisma.progress.findMany({
    where: {
      userId: memberId,
      routineId: Number(routineId),
    },
  });
};

export const deleteSavedWorkout = async (memberId, workoutId) => {
  return await prisma.savedWorkouts.deleteMany({
    where: {
      memberId,
      workoutId: Number(workoutId),
    },
  });
};
