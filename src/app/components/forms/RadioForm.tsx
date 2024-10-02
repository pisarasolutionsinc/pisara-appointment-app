import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface RadioFormProps {
  label?: string;
  id?: string;
  name?: string;
  type?: "radio" | "checkbox";
  className?: string;
  value?: string | number;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const RadioForm = forwardRef<HTMLInputElement, RadioFormProps>(
  (
    {
      label,
      id,
      name,
      type = "radio",
      className,
      value,
      checked,
      onChange,
      onKeyDown,
      disabled = false,
      readOnly = false,
    },
    ref
  ) => {
    return (
      <div className="flex flex-row-reverse items-center gap-3">
        {label && (
          <label
            htmlFor={id}
            className={`block font-semibold ${
              disabled ? "text-gray-400" : "text-black"
            }`}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={twMerge(
            "p-3 focus:outline-none focus:ring-0",
            className,
            disabled ? "cursor-not-allowed" : ""
          )}
          value={value}
          checked={checked}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
    );
  }
);

export default RadioForm;
