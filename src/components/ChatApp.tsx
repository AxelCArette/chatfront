import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMainView from "./ChatMainView";
import { useChatSocket } from "../hooks/useChatSocket";
import type { Room } from "../types";

const ChatApp: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const { rooms, socket, createRoom } = useChatSocket();

  const selectRoom = (room: Room) => {
    if (!username.trim()) {
      alert("Merci d'entrer un pseudo avant de rejoindre un salon 🙃");
      return;
    }
    setCurrentRoom(room);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
      <Sidebar
        rooms={rooms}
        currentRoom={currentRoom}
        onSelectRoom={selectRoom}
        showSidebar={showSidebar}
        toggleSidebar={() => setShowSidebar(!showSidebar)}
        socket={socket!}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          username={username}
          setUsername={setUsername}
          currentRoom={currentRoom}
          onCreateRoom={createRoom}
        />

        <ChatMainView
          currentRoom={currentRoom}
          username={username}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default ChatApp;
