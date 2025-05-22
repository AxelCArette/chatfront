// components/ChatRoom.tsx
import React, { useEffect, useState } from "react";
import type { Message, Room } from "../types";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

type ChatRoomProps = {
  room: Room;
  username: string;
  socket: WebSocket;
};

const ChatRoom: React.FC<ChatRoomProps> = ({ room, username, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Clear messages and request new ones when room changes
    setMessages([]);
    socket.send(JSON.stringify({ action: "get_messages", room_id: room._id }));

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.action === "room_messages" && data.room_id === room._id) {
        setMessages(data.messages);
      }

      if (data.action === "new_message" && data.room_id === room._id) {
        setMessages((prev) => [
          ...prev,
          { username: data.username, message: data.message },
        ]);
      }
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [room, socket]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    socket.send(
      JSON.stringify({
        action: "send_message",
        message: inputMessage,
        room_id: room._id,
        username,
      })
    );
    setInputMessage("");
  };

  return (
    <div className="flex-1 flex flex-col backdrop-blur-sm bg-white/70 rounded-l-2xl shadow-2xl border border-white/20">
      <MessageList messages={messages} username={username} currentRoom={room} />
      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
        username={username}
        currentRoom={room}
      />
    </div>
  );
};

export default ChatRoom;
