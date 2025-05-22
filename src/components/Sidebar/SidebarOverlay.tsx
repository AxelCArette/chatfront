import React from "react";

type Props = {
  toggleSidebar: () => void;
};

export const SidebarOverlay: React.FC<Props> = ({ toggleSidebar }) => (
  <div
    className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
    onClick={toggleSidebar}
  />
);
