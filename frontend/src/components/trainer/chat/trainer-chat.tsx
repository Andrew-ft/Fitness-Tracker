import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { io, Socket } from "socket.io-client";
import API from "@/lib/axios";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Member {
  memberId: number;
  user: {
    userName: string;
    email: string;
  };
}

interface Message {
  messageId: number;
  chatId: number;
  senderId: number;
  content: string;
  createdAt: string;
  tempId?: string;
}

const SOCKET_URL = "http://localhost:8000";

const TrainerChat: React.FC = () => {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(
    null
  );
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [chatId, setChatId] = React.useState<number | null>(null);

  const socketRef = React.useRef<Socket | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const trainerId = Number(localStorage.getItem("userId"));

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get("/trainer/members");
        setMembers(res.data?.members || []);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  React.useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
    }
  }, []);

  React.useEffect(() => {
    if (!selectedMember) return;

    const fetchChat = async () => {
      try {
        const res = await API.get<{
          chatId: number;
          trainerId: number;
          messages: Message[];
        }>(`/chat/trainer/${selectedMember.memberId}`);

        setChatId(res.data.chatId);
        setMessages(res.data.messages);

        const socket = socketRef.current!;
        socket.off("newMessage");

        const handleNewMessage = (msg: Message) => {
          if (msg.chatId !== res.data.chatId) return;
          setMessages((prev) => {
            const exists = prev.find(
              (m) =>
                m.messageId === msg.messageId ||
                (m.tempId && m.tempId === msg.tempId)
            );
            if (exists) return prev;
            return [...prev, msg];
          });
        };

        socket.on("newMessage", handleNewMessage);

        socket.emit("joinChat", {
          memberId: selectedMember.memberId,
          trainerId: trainerId,
        });

        return () => {
          socket.off("newMessage", handleNewMessage);
        };
      } catch (err) {
        console.error("Failed to fetch chat:", err);
        setMessages([]);
        setChatId(null);
      }
    };

    fetchChat();
  }, [selectedMember]);

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const threshold = 150;
    const isNearBottom =
      Math.abs(
        scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight
      ) < threshold;

    if (isNearBottom) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatId || !selectedMember) return;

    const tempId = uuidv4();
    const optimisticMessage: Message = {
      messageId: -1,
      tempId,
      chatId,
      senderId: trainerId,
      content: input,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    const messageContent = input;
    setInput("");

    try {
      const res = await API.post<Message>(
        `/chat/trainer/${selectedMember.memberId}/send`,
        { content: messageContent }
      );
      const savedMessage = res.data;

      setMessages((prev) =>
        prev.map((msg) => (msg.tempId === tempId ? savedMessage : msg))
      );

      //   socketRef.current?.emit("sendMessage", {
      //     chatId,
      //     senderId: trainerId,
      //     content: messageContent,
      //   });
    } catch (err) {
      console.error("Send message error:", err);
      setMessages((prev) => prev.filter((msg) => msg.tempId !== tempId));
    }
  };

  // Delete single message
  const handleDelete = async (messageId: number) => {
    if (!chatId) return;

    setMessages((prev) => prev.filter((m) => m.messageId !== messageId));

    try {
      await API.delete(`/chat/messages/${messageId}`);
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // Delete entire chat
  const handleDeleteChat = async () => {
    if (!chatId || !selectedMember) return;

    try {
      await API.delete(`/chat/${chatId}`);
      setMessages([]);
      setChatId(null);

      // Reset socket listener
      const socket = socketRef.current;
      if (socket) socket.off("newMessage");
    } catch (err) {
      console.error("Delete chat error:", err);
      alert("Failed to delete chat");
    }
  };

  return (
    <div className="flex gap-4">
      {/* Member list */}
      <motion.div
        className="w-64 border-r overflow-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {members.length ? (
          members.map((member) => (
            <div
              key={member.memberId}
              onClick={() => setSelectedMember(member)}
              className={`p-2 cursor-pointer rounded-md mb-1 truncate ${
                selectedMember?.memberId === member.memberId
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              {member.user?.userName || "Unnamed Member"}
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No members assigned</div>
        )}
      </motion.div>

      {/* Chat area */}
      {/* CHAT AREA — FULLY FIXED, SCROLLABLE, BEAUTIFUL */}
      <Card className="flex-1 flex flex-col h-[70vh] rounded-xl overflow-hidden">
        <CardContent className="flex flex-col h-full p-0">
          <ScrollArea className="flex-1 h-full p-3" ref={scrollAreaRef}>
            <div className="p-6 space-y-5">
              {messages.map((msg) => (
                <div
                  key={msg.messageId !== -1 ? msg.messageId : msg.tempId}
                  className={`flex ${
                    msg.senderId === trainerId ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
            relative max-w-[75%] rounded-2xl px-5 py-3.5 shadow-lg break-words
            ${
              msg.senderId === trainerId
                ? "bg-primary text-white"
                : "bg-secondary text-white"
            }
          `}
                  >
                    <p className="text-sm font-medium">{msg.content}</p>

                    {msg.senderId === trainerId && msg.messageId !== -1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg.messageId);
                        }}
                        className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold opacity-0 hover:opacity-100 transition"
                        title="Delete"
                      >
                        ×
                      </button>
                    )}

                    <p className="text-xs opacity-70 mt-2 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="border-t  p-5 ">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                className=" text-white placeholder:text-gray-500 focus-visible:ring-2 "
              />
              <Button
                onClick={handleSend}
                className="bg-primary text-white font-semibold px-8"
              >
                Send
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteChat}
                className="text-gray-300 hover:bg-gray-800"
              >
                Delete Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerChat;
