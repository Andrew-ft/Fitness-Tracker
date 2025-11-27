import express from "express";
import * as chatController from "./chat.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import prisma from "../../config/prisma.js";

const router = express.Router();

router.get("/member/me", authMiddleware, chatController.getMemberChatByAuth);
router.post("/member/me/send", authMiddleware, chatController.memberSendMessage);

router.get("/trainer/:memberId", authMiddleware, chatController.getTrainerChatByAuth);
router.post("/trainer/:memberId/send", authMiddleware, chatController.trainerSendMessageByAuth);


router.delete("/:chatId", authMiddleware, chatController.deleteChatController);

export default router;
