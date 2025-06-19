import prisma from "../../config/prisma.js";

const trainerService = {
  listAll: () => {
    prisma.trainer.findMany({ include: { user: true } });
  },

  getById: (id) => {
    prisma.trainer.findUnique({
      where: { id: Number(id) },
      include: { user: true, workouts: true, assignments: true },
    });
  },

  assignMember: (trainerId, userId) => {
    prisma.trainer.update({
      where: { id: trainerId },
      data: { assignments: { connect: { id: Number(userId) } } },
    });
  },

  unassignMember: (trainerId, userId) => {
    prisma.trainer.update({
      where: { id: trainerId },
      data: { assignments: { disconnect: { id: Number(userId) } } },
    });
  },

  updateExpertise: (id, expertise) => {
    prisma.trainer.update({ where: { id: Number(id) }, data: { expertise } });
  },
};

export default trainerService;
