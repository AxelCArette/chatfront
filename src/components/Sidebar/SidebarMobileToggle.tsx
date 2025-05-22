import React from "react";
import { Menu, X } from "lucide-react";

type Props = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

export const SidebarMobileToggle: React.FC<Props> = ({
  showSidebar,
  toggleSidebar,
}) => (
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
);
