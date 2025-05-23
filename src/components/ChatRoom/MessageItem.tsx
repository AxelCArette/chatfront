import React from "react";
import type { Message } from "../../types";
import { motion } from "framer-motion";

const userColors: string[] = [
  "bg-red-100 text-red-800",
  "bg-orange-100 text-orange-800",
  "bg-yellow-100 text-yellow-800",
  "bg-green-100 text-green-800",
  "bg-teal-100 text-teal-800",
  "bg-cyan-100 text-cyan-800",
  "bg-blue-100 text-blue-800",
  "bg-indigo-100 text-indigo-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800"
];

const userColorMap: Record<string, string> = {};

const getUserColor = (username: string): string => {
  if (!userColorMap[username]) {
    const availableColors = userColors.filter(color => !Object.values(userColorMap).includes(color));
    const randomColor = availableColors.length > 0
      ? availableColors[Math.floor(Math.random() * availableColors.length)]
      : userColors[Math.floor(Math.random() * userColors.length)];
    userColorMap[username] = randomColor;
  }
  return userColorMap[username];
};

type Props = {
  message: Message;
  isUser: boolean;
  isFirstMessage: boolean;
};

const MessageItem: React.FC<Props> = ({ message, isUser, isFirstMessage }) => {
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "";
    }
  };

  const colorClass = getUserColor(message.username);

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 ${
          isUser
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
            : `${colorClass} backdrop-blur-sm shadow-md border border-white/20`
        }`}
      >
        {isFirstMessage && !isUser && (
          <p className="text-xs font-semibold text-gray-600 mb-1">
            {message.username}
          </p>
        )}

        <p className="text-sm leading-relaxed break-words">{message.message}</p>

        {message.timestamp && (
          <p
            className={`text-xs mt-2 ${
              isUser ? "text-blue-100" : "text-gray-500"
            } opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            {formatTime(message.timestamp)}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MessageItem;