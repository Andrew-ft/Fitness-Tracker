import { Router } from "express";
import authController from "./auth.controller.js";
import handleErrorMessage from "../../middlewares/handleErrorMessage.js";
import { body } from "express-validator";
import prisma from "../../config/prisma.js";

const authRouter = Router();

authRouter.post(
  "/register",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Valid email is required")
      .custom(async (value) => {
        const user = await prisma.user.findUnique({ where: { email: value } });
        if (user) {
          throw new Error("Email already in use");
        }
      }),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  handleErrorMessage,
  authController.register
);
authRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Valid email is required"),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  handleErrorMessage,
  authController.login
);
authRouter.post("/logout", authController.logout);

export default authRouter;
