import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMainView from "./ChatMainView";
import { useChatSocket } from "../hooks/useChatSocket";
import { useRoomSocket } from "../hooks/useRoomSocket";
import type { Room } from "../types";

const ChatApp: React.FC = () => {
  const [username, setUsername] = useState("");
  const { createRoom } = useRoomSocket();
  useChatSocket(username);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const selectRoom = (room: Room) => {
    if (!username.trim()) {
      alert("Merci d'entrer un pseudo avant de rejoindre un salon.");
      return;
    }
    setCurrentRoom(room);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  function handleLeaveRoom(): void {
    setCurrentRoom(null);
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
      <Sidebar
        currentRoom={currentRoom}
        onSelectRoom={selectRoom}
        showSidebar={showSidebar}
        toggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          username={username}
          setUsername={setUsername}
          currentRoom={currentRoom}
          onCreateRoom={createRoom}
          onLeaveRoom={handleLeaveRoom}
        />
        <ChatMainView currentRoom={currentRoom} username={username} />
      </div>
    </div>
  );
};

export default ChatApp;