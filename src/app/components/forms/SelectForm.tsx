import { twMerge } from "tailwind-merge";

interface SelectFormProps {
  label?: string;
  className?: string;
  value?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
}

const SelectForm = ({
  label,
  className,
  value,
  options = [],
  onChange,
  name,
  id,
  placeholder = "Select an option",
  disabled = false,
}: SelectFormProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-black font-semibold">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={twMerge(
          "w-full rounded-lg border-0 px-3 py-2  text-black focus:ring focus:ring-primary",
          disabled ? "bg-neutral cursor-not-allowed" : "cursor-pointer",
          className
        )}
        aria-label={placeholder}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
