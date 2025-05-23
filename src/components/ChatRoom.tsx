import React, { useState } from "react";
import type { Room } from "../types";
import MessageList from "./ChatRoom/MessageList";
import MessageInput from "./MessageInput";
import { useChatSocket } from "../hooks/useChatSocket";


type ChatRoomProps = {
  room: Room;
  username: string;
  socket: WebSocket;
};

const ChatRoom: React.FC<ChatRoomProps> = ({ room, username }) => {
  const { messages, sendMessage } = useChatSocket(room._id);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendMessage(username, inputMessage);
    setInputMessage("");
  };

  return (
    <div className="flex-1 flex flex-col backdrop-blur-sm bg-white/70 rounded-l-2xl shadow-2xl border border-white/20">
      <MessageList
        messages={messages}
        username={username}
        currentRoom={room}
      />
      <MessageInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={handleSendMessage}
        username={username}
        currentRoom={room}
      />
    </div>
  );
};

export default ChatRoom;
