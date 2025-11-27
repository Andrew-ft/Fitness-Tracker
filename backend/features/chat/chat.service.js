import prisma from "../../config/prisma.js";

export const getOrCreateChat = async (memberId, trainerId) => {
  if (!memberId || !trainerId) throw new Error("Both memberId and trainerId are required");
  let chat = await prisma.chat.findUnique({
    where: {
      memberId_trainerId: { memberId: +memberId, trainerId: +trainerId },
    },
    include: { messages: true },
  });

  if (!chat) {
    chat = await prisma.chat.create({
      data: { memberId: +memberId, trainerId: +trainerId },
    });
  }

  return chat;
};

export const addMessage = async (chatId, senderId, content) => {
  return await prisma.message.create({
    data: {
      chatId: +chatId,
      senderId: +senderId,
      content,
    },
  });
};

export const getChatMessages = async (chatId) => {
  return await prisma.message.findMany({
    where: { chatId: +chatId },
    orderBy: { createdAt: "asc" },
  });
};

export const deleteChat = async (chatId) => {
  await prisma.message.deleteMany({ where: { chatId } });
  return await prisma.chat.delete({ where: { chatId } });
};

export const createChat = async (memberId, trainerId) => {
  return await prisma.chat.create({
    data: { memberId: +memberId, trainerId: +trainerId },
    include: { messages: true },
  });
};