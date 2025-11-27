import * as chatService from "./chat.service.js";
import prisma from "../../config/prisma.js";

// MEMBER SIDE
export const getMemberChatByAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    const member = await prisma.member.findFirst({ where: { memberId: userId } });
    if (!member) return res.status(404).json({ error: "Member not found" });
    if (!member.trainerId) return res.status(404).json({ error: "Trainer not assigned" });

    const chat = await chatService.getOrCreateChat(member.memberId, member.trainerId);
    const messages = await chatService.getChatMessages(chat.chatId);

    res.json({ chatId: chat.chatId, trainerId: member.trainerId, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const memberSendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

      const member = await prisma.member.findFirst({ where: { memberId: userId } });
    if (!member) return res.status(404).json({ error: "Member not found" });
    if (!member.trainerId) return res.status(400).json({ error: "Trainer not assigned" });

    const chat = await chatService.getOrCreateChat(member.memberId, member.trainerId);
    const message = await chatService.addMessage(chat.chatId, member.memberId, content);

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//TRAINER SIDE 
export const getTrainerChatByAuth = async (req, res) => {
  try {
    const trainerId = req.user?.id;
    const { memberId } = req.params;

    if (!trainerId) return res.status(401).json({ error: "Trainer not authenticated" });
    if (!memberId) return res.status(400).json({ error: "Member ID is required" });

    const chat = await chatService.getOrCreateChat(+memberId, +trainerId);
    const messages = await chatService.getChatMessages(chat.chatId);

    res.json({ chatId: chat.chatId, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const trainerSendMessageByAuth = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { memberId } = req.params;
    const { content } = req.body;

    const chat = await chatService.getOrCreateChat(memberId, trainerId);
    const message = await chatService.addMessage(chat.chatId, trainerId, content);

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteChatController = async (req, res) => {
  try {
      const userId = req.user.id;
      const role = req.user.role;
    const { chatId } = req.params;

    const oldChat = await prisma.chat.findUnique({ where: { chatId: +chatId } });
    if (!oldChat) return res.status(404).json({ error: "Chat not found" });

    await chatService.deleteChat(+chatId);

let newChat;

    if (role === "MEMBER") {
      newChat = await chatService.createChat(userId, oldChat.trainerId);
    } else if (role === "TRAINER") {
      newChat = await chatService.createChat(oldChat.memberId, userId);
    } else {
      return res.status(403).json({ error: "Unauthorized role" });
    }

    res.status(200).json({
      message: "Chat deleted and new chat created",
      chatId: newChat.chatId,
      trainerId: oldChat.trainerId,
      messages: newChat.messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete chat" });
  }
};