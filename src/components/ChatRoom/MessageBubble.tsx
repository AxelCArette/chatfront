import React from "react";
import type { Message } from "../../types";


type Props = {
  message: Message;
  isUser: boolean;
  isFirstMessage: boolean;
};

const MessageBubble: React.FC<Props> = ({ message, isUser, isFirstMessage }) => {
  return (
    <div className={`relative px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl ${
      isUser
        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-lg"
        : "bg-white/90 text-gray-800 rounded-bl-lg border border-white/60"
    } ${!isFirstMessage ? "mt-2" : ""}`}>
      <div className="text-sm leading-relaxed">
        {message.message}
      </div>
      <div className={`absolute w-3 h-3 rounded-full ${
        isUser ? "bg-blue-600 -right-1 top-4" : "bg-white -left-1 top-4 border-2 border-gray-200"
      }`}></div>
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${
        isUser ? "from-transparent via-white/10 to-transparent" : "from-transparent via-blue-50/50 to-transparent"
      } -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
        isUser ? "rounded-br-lg" : "rounded-bl-lg"
      }`}></div>
    </div>
  );
};

export default MessageBubble;
