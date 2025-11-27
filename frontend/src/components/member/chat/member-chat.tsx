import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { io, Socket } from "socket.io-client";
import API from "@/lib/axios";
import { v4 as uuidv4 } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  messageId: number;
  chatId: number;
  senderId: number;
  content: string;
  createdAt: string;
  tempId?: string;
}

interface ChatResponse {
  chatId: number;
  trainerId: number;
  messages: Message[];
}

const SOCKET_URL = "http://localhost:8000";

const MemberChat = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [chatId, setChatId] = React.useState<number | null>(null);
  const [trainerId, setTrainerId] = React.useState<number | null>(null);

  const socketRef = React.useRef<Socket | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const userId = Number(localStorage.getItem("userId"));

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteChat = async () => {
    if (!chatId) return;

    try {
      const res = await API.delete(`/chat/${chatId}`);

      setChatId(res.data.chatId);
      setTrainerId(res.data.trainerId);
      setMessages(res.data.messages);

      socketRef.current?.emit("joinChat", {
        memberId: userId,
        trainerId: res.data.trainerId,
      });

      setInput("");
    } catch (err) {
      console.error("Delete chat error:", err);
      alert("Failed to delete chat");
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const fetchChat = async () => {
      try {
        const res = await API.get<ChatResponse>(`/chat/member/me`);
        if (!isMounted) return;

        setChatId(res.data.chatId);
        setTrainerId(res.data.trainerId);
        setMessages(res.data.messages);

        socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });

        socketRef.current.emit("joinChat", {
          memberId: userId,
          trainerId: res.data.trainerId,
        });

        socketRef.current.off("newMessage");

        socketRef.current.on("newMessage", (msg: Message) => {
          setMessages((prev) => {
            const exists = prev.some(
              (m) =>
                m.messageId === msg.messageId ||
                (m.tempId && msg.tempId && m.tempId === msg.tempId)
            );
            return exists ? prev : [...prev, msg];
          });
        });
      } catch (err) {
        console.error("Chat load error:", err);
      }
    };

    fetchChat();

    return () => {
      isMounted = false;
      socketRef.current?.disconnect();
    };
  }, [userId]);

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
    if (!input.trim() || !chatId) return;

    const tempId = uuidv4();

    const optimisticMessage: Message = {
      messageId: -1,
      tempId,
      chatId,
      senderId: userId,
      content: input,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    const sendingContent = input;
    setInput("");

    try {
      const res = await API.post<Message>(`/chat/member/me/send`, {
        content: sendingContent,
        chatId,
      });

      const savedMessage = res.data;

      setMessages((prev) =>
        prev.map((msg) => (msg.tempId === tempId ? savedMessage : msg))
      );
    } catch (err) {
      console.error("Send message error:", err);

      setMessages((prev) => prev.filter((msg) => msg.tempId !== tempId));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-3xl mx-auto"
    >
      <Card className="flex flex-col h-[70vh] rounded-lg overflow-hidden">
        <CardContent className="flex flex-col h-full p-0">
          <ScrollArea className="flex-1 h-full p-3" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.messageId !== -1 ? msg.messageId : msg.tempId}
                  className={`flex ${
                    msg.senderId === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`
                max-w-[75%] rounded-2xl px-4 py-3 shadow-lg break-words
                ${
                  msg.senderId === userId
                    ? "bg-primary text-white"
                    : "bg-secondary text-gray-100"
                }
              `}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
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

          <div className="border-t p-4 ">
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
                className=" text-white placeholder:text-gray-500  focus-visible:ring-1"
              />
              <Button onClick={handleSend} className="text-white font-medium">
                Send
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteChat}
                className=" text-gray-300 hover:bg-gray-800"
              >
                Delete Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MemberChat;
