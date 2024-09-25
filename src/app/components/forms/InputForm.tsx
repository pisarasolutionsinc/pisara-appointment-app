import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputFormProps {
  type?:
    | "button"
    | "date"
    | "datetime-local"
    | "email"
    | "hidden"
    | "month"
    | "number"
    | "password"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | "color";
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  max?: number;
  maxLength?: number;
}

// Use forwardRef to forward the ref to the input element
const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      type = "text",
      className,
      placeholder = "Placeholder",
      value,
      onChange,
      onKeyDown,
      max,
      maxLength,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={twMerge("w-full rounded-lg border-0", className)}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        max={max}
        maxLength={maxLength}
      />
    );
  }
);

InputForm.displayName = "InputForm"; // Set a display name for the component

export default InputForm;
