import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ScrollToTupButtonProps = PropsWithChildren & {
  onClick: () => void;
  className?: string;
  position?:
    | "bottom-5 right-5"
    | "bbottom-5 left-5"
    | "bottom-5 left-5"
    | "top-5 left-5";
};

const ScrollToTopButton = ({
  onClick,
  className,
  children,
  position = "bottom-5 right-5",
}: ScrollToTupButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className={twMerge(
          `fixed z-50 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark focus:outline-none transition-colors duration-300 ${position}`,
          className
        )}
      >
        {children}
      </button>
    </>
  );
};

export default ScrollToTopButton;
