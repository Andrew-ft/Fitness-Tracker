import { param } from "express-validator";
import trainerService from "./trainerService.js";

const trainerController = {
  listAll: async (req, res) => {
    const trainers = await trainerService.listAll();
    res.json({ trainers });
  },

  getById: async (req, res) => {
    const trainer = await trainerService.getById(req, param.id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.json({ trainer });
  },

  assignMember: async (req, res) => {
    const assignment = await trainerService.assignMember(
      req.param.trainer.id,
      req.param.memberId
    );
    res.json({ message: "Member assigned", assignment });
  },

  unassignMember: async (req, res) => {
    const assignment = await trainerService.unassignMember(
      req.param.trainer.id,
      req.param.memberI
    );
    res.json({ message: "Member unassigned", assignment });
  },

  updateExpertise: async (req, res) => {
    const updated = await trainerService.updateExpertise(
      req.user.trainer.id,
      req.body.expertise
    );
    res.json({ message: "Expertise updated", trainer: updated });
  },
};

export default trainerController;
