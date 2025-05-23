import React from "react";
import { useRoomStore } from "../../stores/roomStore";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarRoomList } from "./SidebarRoomList";
import { SidebarMobileToggle } from "./SidebarMobileToggle";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarOverlay } from "./SidebarOverlay";
import type { Room } from "../../types";

type Props = {
  currentRoom: Room | null;
  onSelectRoom: (room: Room) => void;
  showSidebar: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<Props> = ({
  currentRoom,
  onSelectRoom,
  showSidebar,
  toggleSidebar,
}) => {
  const rooms = useRoomStore((state) => state.rooms); // 👈 via Zustand

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
          currentRoom={currentRoom}
          onSelectRoom={onSelectRoom}
        />
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
