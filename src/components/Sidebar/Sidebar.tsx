import React from "react";
import type { Room } from "../../types";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarRoomList } from "./SidebarRoomList";
import { SidebarMobileToggle } from "./SidebarMobileToggle";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarOverlay } from "./SidebarOverlay";

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
  return (
    <>
      <SidebarMobileToggle showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      {showSidebar && <SidebarOverlay toggleSidebar={toggleSidebar} />}
      <aside
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-500 ease-out fixed md:static z-40 h-full w-80 bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-lg border-r border-white/30 shadow-2xl flex flex-col`}
      >
        <SidebarHeader rooms={rooms} />
        <SidebarRoomList
          rooms={rooms}
          currentRoom={currentRoom}
          onSelectRoom={onSelectRoom}
          socket={socket}
        />
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
