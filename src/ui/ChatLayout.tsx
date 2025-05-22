
import type { ReactNode } from "react";


type ChatLayoutProps = {
  children: ReactNode;
};

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 font-sans">
      {children}
    </div>
  );
};

export default ChatLayout;
