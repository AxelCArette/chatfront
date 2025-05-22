import React from "react";
import { Hash, Loader, Trash } from "lucide-react";
import type { Room } from "../../types";

type Props = {
  rooms: Room[];
  currentRoom: Room | null;
  onSelectRoom: (room: Room) => void;
  socket: WebSocket;
};

export const SidebarRoomList: React.FC<Props> = ({
  rooms,
  currentRoom,
  onSelectRoom,
  socket,
}) => {
  const handleDeleteRoom = (roomId: string) => {
    socket.send(JSON.stringify({ action: "delete_room", room_id: roomId }));
  };

  if (rooms.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center h-64 text-center">
        <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg mb-4">
          <Loader className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
        <p className="text-gray-500 font-medium">Chargement des salons...</p>
        <p className="text-sm text-gray-400 mt-1">Patiente un instant</p>
      </div>
    );
  }

  return (
    <nav className="flex-1 overflow-y-auto p-6 space-y-3">
      {rooms.map((room, index) => {
        const isActive = currentRoom?._id === room._id;
        return (
          <div
            key={room._id}
            className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-105"
                : "bg-white/80 hover:bg-white text-gray-800 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/60"
            }`}
            onClick={() => onSelectRoom(room)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  isActive
                    ? "bg-white/20"
                    : "bg-gradient-to-br from-blue-100 to-indigo-100"
                }`}
              >
                <Hash
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : "text-blue-600"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-base truncate block">
                  {room.name}
                </span>
                <span
                  className={`text-sm ${
                    isActive ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  Salon de discussion
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRoom(room._id);
                }}
                className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-100 transition"
                title="Supprimer ce salon"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
            {isActive && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-8 bg-white rounded-full"></div>
              </div>
            )}
            {!isActive && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
