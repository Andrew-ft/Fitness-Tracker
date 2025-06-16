import { Router } from "express";
import express from "express";
import userController from "./userController.js";
import handleErrorMessage from "../../middlewares/handleErrorMessage.js";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password").notEmpty()
  ],
  handleErrorMessage,
  userController.register
);

export default userRouter;
