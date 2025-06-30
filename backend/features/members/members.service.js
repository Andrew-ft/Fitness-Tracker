import prisma from "../../config/prisma.js";

// workout section
const viewWorkout = async ({
  page = 1,
  limit = 10,
  muscleGroup,
  subMuscleGroup,
  difficulty,
}) => {
  const skip = (page - 1) * limit;

  // for dynamic filters
  const filters = {};
  if (muscleGroup) {
    filters.muscleGroup = muscleGroup;
  }
  if (subMuscleGroup) {
    filters.subMuscleGroup = subMuscleGroup;
  }
  if (difficulty) {
    filters.difficulty = difficulty;
  }

  const [workouts, total] = await Promise.all([
    prisma.workout.findMany({
      where: filters,
      select: {
        id: true,
        name: true,
        description: true,
        muscleGroup: true,
        subMuscleGroup: true,
        difficulty: true,
        caloriesBurned: true,
      },
      skip,
      take: limit,
      orderBy: {
        difficulty: "asc",
      },
    }),
    prisma.workout.count({ where: filters }),
  ]);
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    totalPages,
    totalRecords: total,
    recordsPerPage: limit,
    data: workouts,
  };
};

const viewWorkoutDetails = async (workoutId) => {
  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      muscleGroup: true,
      subMuscleGroup: true,
      difficulty: true,
      caloriesBurned: true,
    },
  });

  if (!workout) {
    throw new Error("Workout not found");
  }
  return workout;
};

// routine section
const createRoutine = async (data, userId) => {
  const { name, time, caloriesBurned, visibility, workouts } = data;
  const existingRoutine = await prisma.routine.findFirst({
    where: {
      name,
      createdById: userId,
    },
  });

  if (existingRoutine) {
    throw new Error(`Routine with the name "${name}" already exists.`);
  }
  const routine = await prisma.routine.create({
    data: {
      name,
      time,
      caloriesBurned,
      visibility,
      createdBy: { connect: { id: userId } },
    },
  });

  for (const w of workouts) {
    let workoutId = w.workoutId;

    if (!workoutId && w.name) {
      const foundWorkout = await prisma.workout.findUnique({
        where: { name: w.name },
      });

      if (!foundWorkout) {
        throw new Error(`Workout with name "${w.name}" not found.`);
      }
      workoutId = foundWorkout.id;
    }
    if (!workoutId) {
      throw new Error("Either workoutId or name is required for each workout");
    }

    await prisma.routineWorkout.create({
      data: {
        routineId: routine.id,
        workoutId,
        sets: w.sets || null,
        reps: w.reps || null,
      },
    });
  }
  return await getRoutineById(routine.id, userId);
};

const updateRoutine = async (routineId, userId, data) => {
  const existingRoutine = await prisma.routine.findUnique({
    where: { id: routineId },
    include: {
      createdBy: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  if (
    !existingRoutine ||
    existingRoutine.createdById !== userId ||
    existingRoutine.createdBy.role !== "member"
  ) {
    throw new Error(
      "Routine not found or you do not have permission to edit it."
    );
  }

  const routine = await prisma.routine.update({
    where: { id: routineId },
    data: {
      name: data.name,
      time: data.time,
      caloriesBurned: data.caloriesBurned,
      visibility: data.visibility,
    },
  });

  if (data.workouts) {
    await prisma.routineWorkout.deleteMany({
      where: { routineId },
    });

    for (const w of data.workouts) {
      let workoutId = w.workoutId;

      if (!workoutId && w.name) {
        const foundWorkout = await prisma.workout.findUnique({
          where: { name: w.name },
        });
        if (!foundWorkout) {
          throw new Error(`Workout with name "${w.name}" not found.`);
        }
        workoutId = foundWorkout.id;
      }

      if (!workoutId) {
        throw new Error(
          "Either workoutId or name is required for each workout."
        );
      }
      await prisma.routineWorkout.create({
        data: {
          routineId,
          workoutId,
          sets: w.sets || null,
          reps: w.reps || null,
        },
      });
    }
  }
  return await getRoutineById(routineId, userId);
};

const deleteRoutine = async (routineId, userId) => {
  const existingRoutine = await prisma.routine.findUnique({
    where: { id: routineId },
    include: {
      createdBy: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  if (
    !existingRoutine ||
    existingRoutine.createdById !== userId ||
    existingRoutine.createdBy.role !== member
  ) {
    throw new Error(
      "Routine not found or you do not have permission to delete it."
    );
  }

  await prisma.routine.delete({
    where: { id: routineId },
  });

  return { message: "Routine deleted successfully" };
};

const getRoutine = async (userId) => {
  const routines = await prisma.routine.findMany({
    where: {
      OR: [{ createdById: userId }, { visibility: "public" }],
    },
    orderBy: { createdAt: "desc" },
  });

  const routinesWithDetails = await Promise.all(
    routines.map((r) => getRoutineById(r.id, userId))
  );

  return routinesWithDetails;
};

const getRoutineById = async (routineId, userId) => {
  const routine = await prisma.routine.findUnique({
    where: { id: routineId },
    include: {
      createdBy: {
        select: {
          id: true,
          fullName: true,
          role: true,
        },
      },
      RoutineWorkout: {
        include: {
          workout: {
            select: {
              id: true,
              name: true,
              muscleGroup: true,
              subMuscleGroup: true,
              difficulty: true,
              caloriesBurned: true,
            },
          },
        },
      },
    },
  });

  if (!routine) {
    throw new Error("Routine not found.");
  }

  if (routine.visibility === "private" && routine.createdById !== userId) {
    throw new Error("You are not authorized to view this routine.");
  }

  return {
    id: routine.id,
    name: routine.name,
    time: routine.time,
    caloriesBurned: routine.caloriesBurned,
    visibility: routine.visibility,
    createdBy: routine.createdBy,
    workouts: routine.RoutineWorkout.map((rw) => ({
      id: rw.workout.id,
      name: rw.workout.name,
      muscleGroup: rw.workout.muscleGroup,
      subMuscleGroup: rw.workout.subMuscleGroup,
      difficulty: rw.workout.difficulty,
      caloriesBurned: rw.workout.caloriesBurned,
      sets: rw.sets,
      reps: rw.reps,
    })),
  };
};

// getting saved workouts and routines
const getSavedWorkouts = async (userId) => {
  const savedWorkouts = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      savedWorkouts: {
        select: {
          id: true,
          name: true,
          description: true,
          muscleGroup: true,
          subMuscleGroup: true,
          difficulty: true,
          caloriesBurned: true,
        },
      },
    },
  });
  return savedWorkouts?.savedWorkouts || [];
};

const getSavedRoutines = async (userId) => {
  const savedRoutines = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      savedRoutines: {
        select: {
          id: true,
          name: true,
          visibility: true,
          time: true,
          caloriesBurned: true,
          workouts: {
            select: {
              id: true,
              name: true,
              muscleGroup: true,
            },
          },
        },
      },
    },
  });
  return savedRoutines?.savedRoutines || [];
};

const memberService = {
  viewWorkout,
  viewWorkoutDetails,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getRoutine,
  getRoutineById,
  getSavedWorkouts,
  getSavedRoutines,
};

export default memberService;
