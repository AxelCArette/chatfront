import React, { useEffect, useRef } from "react";
import type { Message, Room } from "../../types";
import MessageItem from "./MessageItem";
import NoRoomSelected from "./NoRoomSelected";
import EmptyRoom from "./EmptyRoom";

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

  if (!currentRoom) return <NoRoomSelected />;

  return (
    <div className="flex-1 h-full relative">
      <div className="absolute inset-0 overflow-y-auto bg-gradient-to-br from-blue-50/30 to-indigo-50/30 p-6 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto space-y-6 min-h-full">
          {messages.length === 0 ? (
            <EmptyRoom />
          ) : (
            <>
              {messages.map((msg, i) => {
                const isUser = msg.username === username;
                const isFirstMessage = i === 0 || messages[i - 1].username !== msg.username;

                return (
                  <MessageItem
                    key={i}
                    message={msg}
                    isUser={isUser}
                    isFirstMessage={isFirstMessage}
                  />
                );
              })}
            </>
          )}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageList;
