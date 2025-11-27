import { Server } from "socket.io";
import * as chatService from "./features/chat/chat.service.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("joinChat", async ({ memberId, trainerId }) => {
      const chat = await chatService.getOrCreateChat(memberId, trainerId);
      socket.join(`chat_${chat.chatId}`);
      const messages = await chatService.getChatMessages(chat.chatId);
      socket.emit("chatHistory", messages);
    });

    socket.on("sendMessage", async ({ chatId, senderId, content }) => {
      const message = await chatService.addMessage(chatId, senderId, content);
      io.to(`chat_${chatId}`).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

export { io };
