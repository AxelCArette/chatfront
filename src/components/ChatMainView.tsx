import React from "react";
import ChatRoom from "./ChatRoom";
import type { Room } from "../types";
import { useRoomStore } from "../stores/roomStore";

type Props = {
  currentRoom: Room | null;
  username: string;
};

const ChatMainView: React.FC<Props> = ({ currentRoom, username }) => {
  const socket = useRoomStore((state) => state.socket); // 👈 socket depuis store

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
