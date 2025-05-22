import React from "react";
import type { Room } from "../types";
import { Menu, X, Hash, Loader, Trash } from "lucide-react";

type Props = {
  rooms: Room[];
  currentRoom: Room | null;
  onSelectRoom: (room: Room) => void;
  showSidebar: boolean;
  toggleSidebar: () => void;
  socket: WebSocket;
};

const Sidebar: React.FC<Props> = ({
  rooms,
  currentRoom,
  onSelectRoom,
  showSidebar,
  toggleSidebar,
  socket,
}) => {
  const handleDeleteRoom = (roomId: string) => {
    socket.send(JSON.stringify({
      action: "delete_room",
      room_id: roomId
    }));
  };

  return (
    <>
      {/* Bouton mobile */}
      <button
        className="md:hidden fixed top-6 left-6 z-50 group p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/40 shadow-xl text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 active:scale-95"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {showSidebar ? (
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Menu className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* Overlay mobile */}
      {showSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-500 ease-out fixed md:static z-40 h-full w-80 bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-lg border-r border-white/30 shadow-2xl flex flex-col`}
      >
        
        {/* En-tête */}
        <div className="relative bg-gradient-to-r from-white to-blue-50 border-b border-white/40 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
          <div className="relative p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Salons
                </h2>
                <p className="text-sm text-gray-500">
                  {rooms.length} {rooms.length === 1 ? 'salon' : 'salons'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des salons */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-3">
          {rooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg mb-4">
                <Loader className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
              <p className="text-gray-500 font-medium">Chargement des salons...</p>
              <p className="text-sm text-gray-400 mt-1">Patiente un instant</p>
            </div>
          ) : (
            rooms.map((room, index) => {
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
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      isActive 
                        ? "bg-white/20" 
                        : "bg-gradient-to-br from-blue-100 to-indigo-100"
                    }`}>
                      <Hash className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-blue-600"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-base truncate block">
                        {room.name}
                      </span>
                      <span className={`text-sm ${
                        isActive ? "text-blue-100" : "text-gray-500"
                      }`}>
                        Salon de discussion
                      </span>
                    </div>

                    {/* Bouton suppression */}
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

                  {/* Indicateur de sélection */}
                  {isActive && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-8 bg-white rounded-full"></div>
                    </div>
                  )}

                  {/* Effet de brillance au survol */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                </div>
              );
            })
          )}
        </nav>

        {/* Pied de page */}
        <div className="p-6 border-t border-white/40 bg-gradient-to-r from-white/50 to-blue-50/50 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              💬 Chat en temps réel
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Connecté et prêt à discuter
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
