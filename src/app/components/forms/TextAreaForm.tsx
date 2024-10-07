import { useEffect, useRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  areaLabel?: string;
}

const TextAreaForm = ({
  name,
  className,
  placeholder,
  value,
  onChange,
  maxLength,
  areaLabel,
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      name={name}
      className={twMerge(
        "w-full px-4 py-2 rounded-lg border-0",
        "text-black dark:text-white",
        "transition-shadow duration-300 ease-in-out",
        "focus:outline-none focus:ring-primary",
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange?.(e);
        adjustHeight();
      }}
      maxLength={maxLength}
      aria-label={areaLabel}
      style={{ overflow: "hidden", resize: "none" }}
      rows={1}
    />
  );
};

export default TextAreaForm;
