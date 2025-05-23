import React, { useState } from "react";
import type { Room } from "../types";
import { PlusCircle, Hash, User, LogOut } from "lucide-react";

type Props = {
  username: string;
  setUsername: (name: string) => void;
  currentRoom: Room | null;
  onCreateRoom: (name: string, username: string) => void;
  onLeaveRoom: () => void;
};

const ChatHeader: React.FC<Props> = ({
  username,
  setUsername,
  currentRoom,
  onCreateRoom,
  onLeaveRoom
}) => {
  const [newRoomName, setNewRoomName] = useState("");

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName.trim(), username);
      setNewRoomName("");
    }
  };

  return (
    <header className="relative bg-gradient-to-r from-white to-blue-50 border-b border-white/40 shadow-lg backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pointer-events-none" />
      <div className="relative px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
        <div className="flex flex-col w-48">
          <label className="text-sm text-gray-600 font-medium mb-1">Ton pseudo</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ex : Loki"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-md border border-white/40 pl-9 pr-3 py-2 rounded-xl text-sm shadow focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition"
            />
            {username.trim() === "" && (
              <p className="text-xs text-red-500 mt-1">Un pseudo est requis !</p>
            )}
          </div>
        </div>

        {!currentRoom && (
          <div className="flex flex-col w-64">
            <label className="text-sm text-gray-600 font-medium mb-1">Créer un salon</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nom du salon..."
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
                className="w-full bg-white/80 backdrop-blur-md border border-white/40 px-3 py-2 rounded-xl text-sm shadow focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition"
              />
              <button
                onClick={handleCreateRoom}
                className="relative group p-2 bg-gradient-to-br from-blue-500 to-indigo-600 
                           hover:from-blue-600 hover:to-purple-600 hover:ring-2 hover:ring-blue-300
                           hover:scale-105 transition-all duration-300 transform rounded-xl text-white shadow-md hover:shadow-xl"
                title="Créer un salon"
              >
                <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="absolute -inset-1 rounded-xl bg-indigo-400 opacity-0 group-hover:opacity-20 transition" />
              </button>
            </div>
          </div>
        )}

        {currentRoom && (
          <div className="flex flex-col w-48">
            <label className="text-sm text-gray-600 font-medium mb-1">Tu veux partir ?</label>
            <button
              onClick={onLeaveRoom}
              className="flex items-center gap-2 justify-center 
                         bg-red-500 hover:bg-red-600 hover:ring-2 hover:ring-red-300
                         hover:scale-105 transition-all duration-300 transform text-white px-4 py-2 rounded-xl shadow hover:shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              Quitter
            </button>
          </div>
        )}

        <div className="flex flex-col w-56">
          <label className="text-sm text-gray-600 font-medium mb-1">Salon actuel</label>
          <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-xl shadow border border-white/40">
            <div
              className={`p-2 rounded-xl transition-colors ${
                currentRoom
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                  : "bg-gray-300"
              }`}
            >
              <Hash className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1
                className={`text-sm font-semibold transition ${
                  currentRoom
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    : "text-gray-500"
                }`}
              >
                {currentRoom ? currentRoom.name : "Aucun salon"}
              </h1>
              <p className="text-xs text-gray-400">Salon de discussion</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;