import React, { useEffect, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import type { Room } from "../types";

type Props = {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  sendMessage: () => void;
  username: string;
  currentRoom: Room | null;
};

const MessageInput: React.FC<Props> = ({
  inputMessage,
  setInputMessage,
  sendMessage,
  username,
  currentRoom,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const canSend = username.trim() && currentRoom;

  useEffect(() => {
    if (canSend) {
      inputRef.current?.focus();
    }
  }, [currentRoom, username]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canSend) {
      sendMessage();
    }
  };

  return (
    <div className="p-4 border-t bg-white/80 backdrop-blur-lg border-white/30">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder={
            !username.trim()
              ? "Entre un pseudo pour envoyer un message"
              : !currentRoom
              ? "Choisis un salon pour discuter"
              : "Ton message ici..."
          }
          className="flex-1 px-4 py-3 rounded-full border border-white/40 shadow-sm text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!canSend}
        />
        <button
          onClick={sendMessage}
          disabled={!canSend}
          className={`p-3 rounded-full text-white transition-all ${
            canSend
              ? "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:scale-105"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
