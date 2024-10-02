import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, title, className }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-2 z-50">
      <div className="flex items-center justify-center md:min-h-screen">
        <div
          className="fixed inset-0 bg-gray-800 opacity-70"
          onClick={onClose}
        ></div>

        <div
          className={twMerge(
            "relative w-full bg-light p-5 rounded-2xl space-y-5 overflow-auto max-h-[90vh]",
            className
          )}
        >
          {title && (
            <>
              <div className="flex items-baseline justify-between gap-5">
                <h1 className="font-bold text-dark capitalize">{title}</h1>
              </div>
              <hr />
            </>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
