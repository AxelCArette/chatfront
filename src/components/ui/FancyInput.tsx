import React from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: LucideIcon;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  size?: "sm" | "md"; // future proof
};

const FancyInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  onKeyDown,
  type = "text",
  size = "sm",
}) => {
  const heightClasses = size === "sm" ? "py-2 text-sm" : "py-3 text-base";

  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-white/40 bg-white/70 backdrop-blur-md shadow px-4 ${
          Icon ? "pl-10" : ""
        } ${heightClasses} text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200`}
      />
    </div>
  );
};

export default FancyInput;
