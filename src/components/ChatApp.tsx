// src/components/ChatApp.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMainView from "./ChatMainView";
import { useChatSocket } from "../hooks/useChatSocket";
import { useRoomSocket } from "../hooks/useRoomSocket";
import type { Room } from "../types";

const ChatApp: React.FC = () => {
  // 1. Déclare d’abord le state `username`
  const [username, setUsername] = useState("");

  // 2. Monte la WS “rooms” et expose createRoom(name, username)
  const { createRoom } = useRoomSocket();

  // 3. Monte la WS “chat”, en passant `username` (déclaré juste au-dessus)
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
        {/* On passe createRoom(name, username) depuis useRoomSocket */}
        <ChatHeader
          username={username}
          setUsername={setUsername}
          currentRoom={currentRoom}
          onCreateRoom={createRoom}
           onLeaveRoom={handleLeaveRoom} // ✅ ajoute ceci
        />

        <ChatMainView currentRoom={currentRoom} username={username} />
      </div>
    </div>
  );
};

export default ChatApp;
