import express from "express";
import { Router } from "express";
import handleErrorMessage from "../../middlewares/handleErrorMessage.js";
import { body } from "express-validator";
import workoutController from "./workoutController.js";

const workoutRouter = express.Router();

workoutRouter.post('', [
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("type").notEmpty(),
    body("muscleGroup").notEmpty(),
    body("difficulty").notEmpty(),
    body("isCustom").notEmpty(), 
], handleErrorMessage, workoutController.store);
workoutRouter.get('', workoutController.show);
workoutRouter.patch('/:id', workoutController.update);
workoutRouter.delete('/:id', workoutController.destroy);

export default workoutRouter;