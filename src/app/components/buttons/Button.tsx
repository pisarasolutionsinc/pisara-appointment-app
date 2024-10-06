import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
};

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  ariaLabel,
  disable = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        "px-6 py-3 text-black dark:text-white rounded-lg",
        disable ? "bg-neutral text-gray-200 cursor-not-allowed" : "",
        className
      )}
      aria-label={ariaLabel}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default Button;
