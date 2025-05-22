import React from "react";
import { Hash } from "lucide-react";
import type { Room } from "../../types";

type Props = { rooms: Room[] };

export const SidebarHeader: React.FC<Props> = ({ rooms }) => (
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
            {rooms.length} {rooms.length === 1 ? "salon" : "salons"}
          </p>
        </div>
      </div>
    </div>
  </div>
);
