import { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = PropsWithChildren & {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

const Button = ({ children, className, onClick, ariaLabel }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "px-6 py-3 text-black dark:text-white rounded-lg",

        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
