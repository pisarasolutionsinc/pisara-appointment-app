import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface AccordionProps {
  title: string;
  content: string;
  isOpen: boolean; // New prop to control open/close behavior
  onClick: () => void; // New prop for parent to control when clicked
  className?: string;
}

const Accordion = ({
  title,
  content,
  isOpen,
  onClick,
  className,
}: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={twMerge("border-b border-black/35", className)}>
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <h1 className="text-lg font-medium text-black">{title}</h1>
        <IoIosArrowDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="transition-max-height duration-500 ease-in-out overflow-hidden"
      >
        <p className="py-4 text-black/90">{content}</p>
      </div>
    </div>
  );
};

export default Accordion;
