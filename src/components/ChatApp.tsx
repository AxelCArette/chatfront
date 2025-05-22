// ChatApp.tsx
import React, { useEffect, useRef, useState } from "react";
import type { Room } from "../types";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatRoom from "./ChatRoom";

const ChatApp: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [username, setUsername] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8888/ws/chat");

    socketRef.current.onopen = () => {
      socketRef.current?.send(JSON.stringify({ action: "get_rooms" }));
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      switch (data.action) {
        case "rooms_list":
          setRooms(data.rooms);
          break;
        case "room_created":
          setRooms((prev) => [...prev, data]);
          break;
        default:
          break;
      }
    };

    return () => socketRef.current?.close();
  }, []);

  const selectRoom = (room: Room) => {
    if (!username.trim()) {
      alert("Merci d'entrer un pseudo avant de rejoindre un salon 🙃");
      return;
    }

    setCurrentRoom(room);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const createRoom = (name: string) => {
    if (!name.trim()) return;

    socketRef.current?.send(
      JSON.stringify({
        action: "create_room",
        name,
      })
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
      <Sidebar
        rooms={rooms}
        currentRoom={currentRoom}
        onSelectRoom={selectRoom}
        showSidebar={showSidebar}
        toggleSidebar={() => setShowSidebar(!showSidebar)}
        socket={socketRef.current!}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          username={username}
          setUsername={setUsername}
          currentRoom={currentRoom}
          onCreateRoom={createRoom}
        />

        {currentRoom && socketRef.current ? (
          <ChatRoom
            room={currentRoom}
            username={username}
            socket={socketRef.current}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-xl italic text-gray-500">
            Sélectionne un salon pour commencer 💬
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
