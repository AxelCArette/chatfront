import React, { useEffect, useState } from "react";
import { Hash, Trash } from "lucide-react";
import type { Room } from "../../types";
import { useRoomStore } from "../../stores/roomStore";

type Props = {
  currentRoom: Room | null;
  onSelectRoom: (room: Room) => void;
};

export const SidebarRoomList: React.FC<Props> = ({
  currentRoom,
  onSelectRoom,
}) => {
  const rooms = useRoomStore((state) => state.rooms);
  const socket = useRoomStore((state) => state.socket);
  const [longLoading, setLongLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!rooms.length) setLongLoading(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [rooms]);

  const handleDeleteRoom = (roomId: string) => {
    if (socket) {
      socket.send(JSON.stringify({ action: "delete_room", room_id: roomId }));
    }
  };

  if (!rooms.length && !longLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center h-64 text-center">
        <div className="text-5xl animate-bounce-slow mb-2">😴</div>
        <p className="text-gray-500 font-medium">Chargement des salons...</p>
        <p className="text-sm text-gray-400 mt-1">On cherche ton espace...</p>
      </div>
    );
  }

  if (!rooms.length && longLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center h-64 text-center">
        <div className="text-5xl mb-2">🪄</div>
        <p className="text-gray-500 font-medium">Aucun salon trouvé</p>
        <p className="text-sm text-gray-400 mt-1">
          Tu peux en créer un pour commencer !
        </p>

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
            {!isActive && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
