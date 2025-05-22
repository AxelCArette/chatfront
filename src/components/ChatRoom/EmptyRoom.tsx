
import { Users } from "lucide-react";

const EmptyRoom = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8">
    <div className="relative">
      <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl shadow-lg">
        <Users className="w-16 h-16 text-green-500" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
    </div>
    <h3 className="text-2xl font-bold text-gray-600 mt-6 mb-2">Salon vide</h3>
    <p className="text-gray-500 text-center max-w-sm">
      Sois le premier à briser la glace ! Écris un message pour commencer la conversation.
    </p>
  </div>
);

export default EmptyRoom;
