import type { Message } from "../../types";

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
      return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return "";
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
          : 'bg-white/80 backdrop-blur-sm text-gray-800 shadow-md border border-white/20'
      }`}>
        {isFirstMessage && !isUser && (
          <p className="text-xs font-semibold text-gray-600 mb-1">
            {message.username}
          </p>
        )}
        
        <p className="text-sm leading-relaxed break-words">
          {message.message}
        </p>
        
        {message.timestamp && (
          <p className={`text-xs mt-2 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          } opacity-0 group-hover:opacity-100 transition-opacity`}>
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageItem;