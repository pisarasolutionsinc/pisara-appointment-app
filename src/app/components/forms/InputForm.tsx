import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputFormProps {
  label?: string;
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
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  max?: number | string;
  min?: number | string;
  maxLength?: number;
  step?: number | string;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      label,
      id,
      name,
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
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-black font-semibold">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={twMerge(
            "w-full rounded-lg border-0 px-3 py-2 focus:outline-none focus:ring focus:ring-primary",
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
      </div>
    );
  }
);

InputForm.displayName = "InputForm";

export default InputForm;
