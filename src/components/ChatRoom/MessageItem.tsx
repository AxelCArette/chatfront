import React from "react";
import type { Message } from "../../types";
import UserHeader from "./UserHeader";
import MessageBubble from "./MessageBubble";

type Props = {
  message: Message;
  isUser: boolean;
  isFirstMessage: boolean;
};

const MessageItem: React.FC<Props> = ({ message, isUser, isFirstMessage }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
      <div className={`relative max-w-md lg:max-w-lg ${isUser ? "order-2" : "order-1"}`}>
        {isFirstMessage && (
          <UserHeader username={message.username} isUser={isUser} />
        )}
        <MessageBubble message={message} isUser={isUser} isFirstMessage={isFirstMessage} />
      </div>
    </div>
  );
};

export default MessageItem;
