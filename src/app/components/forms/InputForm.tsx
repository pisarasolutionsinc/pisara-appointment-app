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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  max?: number | string;
  min?: number | string;
  maxLength?: number;
  step?: number | string;
  disabled?: boolean;
  readOnly?: boolean;
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
      min,
      maxLength,
      step,
      disabled = false,
      readOnly = false,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          "w-full rounded-lg border-0 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary", // Default styling
          className
        )}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        max={max}
        min={min}
        maxLength={maxLength}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
      />
    );
  }
);

InputForm.displayName = "InputForm"; // Set a display name for the component

export default InputForm;
