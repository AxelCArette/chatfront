import React, { useEffect, useRef } from "react";
import type { Message, Room } from "../types";
import { MessageCircle, Users } from "lucide-react";

type Props = {
  messages: Message[];
  username: string;
  currentRoom: Room | null;
};

const MessageList: React.FC<Props> = ({ messages, username, currentRoom }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentRoom) return (
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

  if (messages.length === 0) return (
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

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/30 to-indigo-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((msg, i) => {
          const isUser = msg.username === username;
          const isFirstMessage = i === 0 || messages[i - 1].username !== msg.username;
          
          return (
            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
              <div className={`relative max-w-md lg:max-w-lg ${isUser ? "order-2" : "order-1"}`}>
                
                {/* Avatar et nom d'utilisateur */}
                {isFirstMessage && (
                  <div className={`flex items-center gap-2 mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                      isUser 
                        ? "from-blue-500 to-indigo-600" 
                        : "from-emerald-500 to-green-600"
                    } flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-sm font-bold">
                        {msg.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {msg.username}
                    </span>
                  </div>
                )}

                {/* Message */}
                <div className={`relative px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl ${
                  isUser 
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-lg" 
                    : "bg-white/90 text-gray-800 rounded-bl-lg border border-white/60"
                } ${!isFirstMessage ? "mt-2" : ""}`}>
                  
                  <div className="text-sm leading-relaxed">
                    {msg.message}
                  </div>

                  {/* Indicateur de message */}
                  <div className={`absolute w-3 h-3 rounded-full ${
                    isUser 
                      ? "bg-blue-600 -right-1 top-4" 
                      : "bg-white -left-1 top-4 border-2 border-gray-200"
                  }`}></div>

                  {/* Effet de brillance */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${
                    isUser 
                      ? "from-transparent via-white/10 to-transparent" 
                      : "from-transparent via-blue-50/50 to-transparent"
                  } -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
                    isUser ? "rounded-br-lg" : "rounded-bl-lg"
                  }`}></div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default MessageList;