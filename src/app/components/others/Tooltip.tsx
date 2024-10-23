import React from "react";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({
  text,
  children,
  className,
  direction = "right",
}: TooltipProps) => {
  const getPositionClasses = () => {
    switch (direction) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 translate-y-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 -translate-x-2";
      case "right":
      default:
        return "left-full top-1/2 transform -translate-y-1/2 translate-x-2";
    }
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={twMerge(
          `absolute hidden group-hover:block z-20 bg-gray-700 text-white text-xs rounded py-1 px-2 text-nowrap ${getPositionClasses()}`,
          className
        )}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
