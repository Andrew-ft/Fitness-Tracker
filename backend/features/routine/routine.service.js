import prisma from "../../config/prisma.js";

// Create a routine
export const createRoutine = async (data, userId, role) => {
  const { routineWorkouts, ...routineData } = data;

  return await prisma.routine.create({
    data: {
      ...routineData,
      createdById: userId,
      routineWorkouts: routineWorkouts
        ? {
            create: routineWorkouts.map((rw) => ({
              workoutId: rw.workoutId,
              sets: rw.sets,
              reps: rw.reps,
              timeMinutes: rw.timeMinutes,
              calories: rw.calories,
              equipment: rw.equipment,
            })),
          }
        : undefined,
    },
    include: {
      routineWorkouts: true,
      createdBy: true,
    },
  });
};

// Get all routines
export const getAllRoutines = async (userId, role) => {
  if (role === "ADMIN" || role === "TRAINER") {
    return await prisma.routine.findMany({
      include: { routineWorkouts: true, createdBy: true },
    });
  }

  return await prisma.routine.findMany({
    where: {
      OR: [{ isPrivate: false }, { createdById: userId }],
    },
    include: { routineWorkouts: true, createdBy: true },
  });
};

// Get routine by ID
export const getRoutineById = async (id, userId, role) => {
  const routine = await prisma.routine.findUnique({
    where: { routineId: Number(id) },
    include: {
      routineWorkouts: {
        include: { workout: true },
    }, createdBy: true },
  });

  if (!routine) throw new Error("Routine not found");

  if (
    role === "MEMBER" &&
    routine.isPrivate &&
    routine.createdById !== userId
  ) {
    throw new Error("Access denied");
  }

  return routine;
};

// Update a routine
export const updateRoutine = async (id, data, userId, role) => {
  const routine = await prisma.routine.findUnique({
    where: { routineId: Number(id) },
  });

  if (!routine) throw new Error("Routine not found");
  if (role === "MEMBER" && routine.createdById !== userId) {
    throw new Error("You cannot update this routine");
  }

  const { routineWorkouts, ...routineData } = data;

  if (routineWorkouts) {
    await prisma.routine_Workout.deleteMany({
      where: { routineId: Number(id) },
    });
  }

  return await prisma.routine.update({
    where: { routineId: Number(id) },
    data: {
      ...routineData,
      routineWorkouts: routineWorkouts
        ? {
            create: routineWorkouts.map((rw) => ({
              workoutId: rw.workoutId,
              sets: rw.sets,
              reps: rw.reps,
              timeMinutes: rw.timeMinutes,
              calories: rw.calories,
              equipment: rw.equipment,
            })),
          }
        : undefined,
    },
    include: { routineWorkouts: true, createdBy: true },
  });
};

// Delete a routine
export const deleteRoutine = async (id, userId, role) => {
  const routine = await prisma.routine.findUnique({
    where: { routineId: Number(id) },
  });

  if (!routine) throw new Error("Routine not found");
  if (role === "MEMBER" && routine.createdById !== userId) {
    throw new Error("You cannot delete this routine");
  }

  await prisma.routine_Workout.deleteMany({
    where: { routineId: Number(id) },
  });

  return prisma.routine.delete({
    where: { routineId: Number(id) },
  });
};

// Save routine for a member
export const saveRoutine = async (memberId, routineId) => {
  const routine = await prisma.routine.findUnique({
    where: { routineId: Number(routineId) },
  });
  if (!routine) throw new Error("Routine not found");

  return await prisma.savedRoutines.create({
    data: {
      memberId,
      routineId: Number(routineId),
    },
  });
};


// Complete routine (and selected workouts)
export const completeRoutine = async (
  memberId,
  routineId,
  completedWorkouts = [],
) => {
  const routine = await prisma.routine.findUnique({
    where: { routineId: Number(routineId) },
    include: { routineWorkouts: true },
  });
  if (!routine) throw new Error("Routine not found");

  const now = new Date();

  await prisma.progress.upsert({
    where: {
      userId_routineId_workoutId: {
        userId: memberId,
        routineId: Number(routineId),
        workoutId: null,
      },
    },
    update: { isCompleted: true, completedAt: now },
    create: {
      userId: memberId,
      routineId: Number(routineId),
      isCompleted: true,
      completedAt: now,
    },
  });

  if (completedWorkouts.length > 0) {
    const workoutProgress = completedWorkouts.map((workoutId) => ({
      userId: memberId,
      routineId: Number(routineId),
      workoutId: Number(workoutId),
      isCompleted: true,
      completedAt: now,
    }));

    await prisma.progress.createMany({
      data: workoutProgress,
      skipDuplicates: true,
    });
  }

  return { routineId: routine.routineId, completedAt: now };
};

export const unsaveRoutine = async (memberId, routineId) => {
  const savedRoutine = await prisma.savedRoutines.findUnique({
    where: {
      memberId_routineId: {
        memberId,
        routineId: Number(routineId),
      },
    },
  });

  if (!savedRoutine) throw new Error("Routine not found in saved routines");

  return await prisma.savedRoutines.delete({
    where: {
      memberId_routineId: {
        memberId,
        routineId: Number(routineId),
      },
    },
  });
};

// Get saved routines for a member
export const getSavedRoutines = async (memberId) => {
  return await prisma.savedRoutines.findMany({
    where: { memberId },
    include: { routine: true },
  });
};
