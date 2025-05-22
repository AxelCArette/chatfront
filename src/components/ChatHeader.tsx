import React, { useState } from "react";
import type { Room } from "../types";
import { PlusCircle, Hash, User } from "lucide-react";

type Props = {
  username: string;
  setUsername: (name: string) => void;
  currentRoom: Room | null;
  onCreateRoom: (name: string) => void;
};

const ChatHeader: React.FC<Props> = ({ username, setUsername, currentRoom, onCreateRoom }) => {
  const [newRoomName, setNewRoomName] = useState("");

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName.trim());
      setNewRoomName("");
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-b border-white/30 shadow-lg backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
      <div className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-6 gap-6">
        
        {/* Titre du salon actuel */}
        <div className="flex items-center gap-3 w-full lg:w-auto text-center lg:text-left">
          {currentRoom ? (
            <>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {currentRoom.name}
                </h1>
                <p className="text-sm text-gray-500">Salon de discussion</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-600">
                  Sélectionne un salon
                </h1>
                <p className="text-sm text-gray-400">Commence par choisir un salon</p>
              </div>
            </div>
          )}
        </div>

        {/* Création de salon */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <input
              type="text"
              placeholder="Nouveau salon..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
              className="w-full lg:w-64 bg-white/80 backdrop-blur-sm border border-white/40 px-4 py-3 rounded-2xl text-sm shadow-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 placeholder-gray-400"
            />
          </div>
          <button
            onClick={handleCreateRoom}
            className="group p-3 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-2xl text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Créer un salon"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Champ utilisateur */}
        <div className="relative w-full lg:w-auto">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Ton pseudo..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full lg:w-48 bg-white/80 backdrop-blur-sm border border-white/40 pl-12 pr-4 py-3 rounded-2xl text-sm shadow-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;