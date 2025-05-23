import { useEffect, useRef, useState } from "react";
import type { Message } from "@/types";

export const useChatSocket = (roomId: string | null) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket("ws://localhost:8888/ws/chat");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[WS Chat] ✅ Connecté");
      socket.send(JSON.stringify({ action: "get_messages", room_id: roomId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case "room_messages":
          setMessages(data.messages || []);
          break;

        case "new_message":
          if (data.room_id === roomId) {
            setMessages((prev) => [...prev, data as Message]);
          }
          break;

        default:
          console.warn("[WS Chat] ⚠️ Action inconnue :", data.action);
      }
    };

    socket.onclose = () => {
      console.log("[WS Chat] ❌ Déconnecté");
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  const sendMessage = (username: string, message: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    const payload = {
      action: "send_message",
      room_id: roomId,
      username,
      message,
    };

    socketRef.current.send(JSON.stringify(payload));
  };

  return { messages, sendMessage };
};
