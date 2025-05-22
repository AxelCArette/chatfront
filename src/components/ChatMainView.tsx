import React from "react";
import ChatRoom from "./ChatRoom";
import type { Room } from "../types";

type Props = {
  currentRoom: Room | null;
  username: string;
  socket: WebSocket | null;
};

const ChatMainView: React.FC<Props> = ({ currentRoom, username, socket }) => {
  if (!currentRoom || !socket) {
    return (
      <div className="flex-1 flex items-center justify-center text-xl italic text-gray-500">
        Sélectionne un salon pour commencer 💬
      </div>
    );
  }

  return <ChatRoom room={currentRoom} username={username} socket={socket} />;
};

export default ChatMainView;
