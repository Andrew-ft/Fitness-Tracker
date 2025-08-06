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
    body("email").notEmpty().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  authController.login
);

authRouter.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage("Passwords do not match"),
  ],
  handleErrorMessage,
  authController.resetPassword
);

authRouter.post("/logout", authController.logout);

export default authRouter;
