import prisma from "../../config/prisma.js";
import { randomUUID } from "crypto";

/**
 * Start a new session for a routine
 */
export const startRoutineProgress = async (memberId, routineId) => {
  const sessionId = randomUUID();
  const routineProgress = await prisma.progress.create({
    data: {
      memberId,
      routineId,
      workoutId: null,
      sessionId,
      status: "IN_PROGRESS",
    },
  });

  return { sessionId, routineProgress };
};

export const finishRoutineProgress = async (
  memberId,
  routineId,
  sessionId,
  completedWorkoutIds
) => {
  await prisma.progress.updateMany({
    where: { memberId, routineId, sessionId, workoutId: null },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  const workoutProgressPromises = completedWorkoutIds.map((workoutId) =>
    prisma.progress.upsert({
      where: {
        memberId_routineId_workoutId_sessionId: {
          memberId,
          routineId,
          workoutId,
          sessionId,
        },
      },
      update: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
      create: {
        memberId,
        routineId,
        workoutId,
        sessionId,
        status: "COMPLETED",
        completedAt: new Date(),
      },
    })
  );

  const workoutProgress = await Promise.all(workoutProgressPromises);

  return { workoutProgress };
};

/**
 * Get all sessions for a routine
 */
export const getMemberRoutineProgress = async (memberId, routineId) => {
  return await prisma.progress.findMany({
    where: { memberId, routineId },
    orderBy: [{ sessionId: "asc" }, { createdAt: "asc" }],
  });
};

/**
 * Analytics (completed sessions grouped by routine)
 */
export const getMemberAnalytics = async (memberId) => {
  return await prisma.progress.findMany({
    where: { memberId, status: "COMPLETED" },
    select: {
      routineId: true,
      completedAt: true,
      status: true,
    },
  });
};
