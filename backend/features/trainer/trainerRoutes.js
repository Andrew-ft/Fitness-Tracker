import { Router } from "express";
import express from "express";
import trainerController from "./trainerController.js";
import handleErrorMessage from "../../middlewares/handleErrorMessage.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import { body } from "express-validator";
import prisma from "../../config/prisma.js";

const trainerRouter = express.Router();

trainerRouter.get("/", authMiddleware, trainerController.listAll);
trainerRouter.get("/:id", authMiddleware, trainerController.getById);
trainerRouter.post(
  "/assign-member/:memberId",
  authMiddleware,
  roleMiddleware("trainer"),
  trainerController.assignMember
);
trainerRouter.delete(
  "/unassign-member/:memberId",
  authMiddleware,
  roleMiddleware("trainer"),
  trainerController.unassignMember
);
trainerRouter.patch(
  "/update-expertise",
  authMiddleware,
  roleMiddleware("trainer"),
  body("expertise").notEmpty(),
  handleErrorMessage,
  trainerController.updateExpertise
);

export default trainerRouter;
