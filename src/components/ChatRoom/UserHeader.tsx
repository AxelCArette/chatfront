import React from "react";

type Props = {
  username: string;
  isUser: boolean;
};

const UserHeader: React.FC<Props> = ({ username, isUser }) => {
  return (
    <div className={`flex items-center gap-2 mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
        isUser ? "from-blue-500 to-indigo-600" : "from-emerald-500 to-green-600"
      } flex items-center justify-center shadow-lg`}>
        <span className="text-white text-sm font-bold">
          {username.charAt(0).toUpperCase()}
        </span>
      </div>
      <span className="text-sm font-semibold text-gray-600">
        {username}
      </span>
    </div>
  );
};

export default UserHeader;
