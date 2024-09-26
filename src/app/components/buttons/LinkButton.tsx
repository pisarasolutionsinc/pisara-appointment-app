import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type LinkButtonProps = PropsWithChildren & {
  path: string;
  className?: string;
  ariaLabel?: string;
};

const LinkButton = ({
  path,
  className,
  children,
  ariaLabel,
}: LinkButtonProps) => {
  return (
    <>
      <div>
        <Link
          to={path}
          className={twMerge(
            "px-6 py-3 text-black dark:text-white rounded-lg",
            className
          )}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      </div>
    </>
  );
};

export default LinkButton;
