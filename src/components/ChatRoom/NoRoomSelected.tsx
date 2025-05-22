import { MessageCircle } from "lucide-react";

const NoRoomSelected = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 p-8">
    <div className="relative">
      <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl shadow-lg">
        <MessageCircle className="w-16 h-16 text-blue-500" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
    </div>
    <h3 className="text-2xl font-bold text-gray-600 mt-6 mb-2">Bienvenue dans le chat !</h3>
    <p className="text-gray-500 text-center max-w-sm">
      Sélectionne un salon dans la barre latérale pour commencer à discuter avec d'autres utilisateurs.
    </p>
  </div>
);

export default NoRoomSelected;
