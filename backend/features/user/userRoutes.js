import { Router } from "express";
import express from "express";
import userController from "./userController.js";
import handleErrorMessage from "../../middlewares/handleErrorMessage.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import roleMiddleware from "../../middlewares/roleMiddleware.js";
import { body } from "express-validator";
import prisma from "../../config/prisma.js";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").custom(async (value) => {
      const user = await prisma.user.findFirst({ where: { email: value } });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
    body("password").isLength({ min: 6 }),
    body("role"),
  ],
  handleErrorMessage,
  userController.register
);

userRouter.get("/me", authMiddleware, userController.me);
userRouter.patch(
  "/update-profile",
  authMiddleware,
  body("name").optional(),
  body("email").optional().isEmail(),
  handleErrorMessage,
  userController.updateProfile
);

userRouter.patch(
  "/change-password",
  authMiddleware,
  body("oldPassword").notEmpty(),
  body("newPassword").isLength({ min: 6 }),
  handleErrorMessage,
  userController.changePassword
);

userRouter.delete('/delete-account', authMiddleware, userController.deleteAccount);
userRouter.get('/all', authMiddleware, roleMiddleware("admin"), userController.listAll);
userRouter.patch('/promote/:id', authMiddleware, roleMiddleware("admin"), userController.promote);
userRouter.patch('/demote/:id', authMiddleware, roleMiddleware("admin"), userController.demote);

export default userRouter;