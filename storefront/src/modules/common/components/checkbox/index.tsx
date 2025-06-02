import React from "react"
import { clx } from "@medusajs/ui"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
  id?: string
  disabled?: boolean
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
  name,
  id,
  disabled = false,
  'data-testid': dataTestId
}) => {
  const checkboxId = id || `checkbox-${name || Math.random().toString(36).substr(2, 9)}`

  return (
    <label 
      htmlFor={checkboxId}
      className={clx(
        "flex items-center gap-3 cursor-pointer group touch-target",
        "transition-colors duration-200",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <div className="relative">
        <input
          id={checkboxId}
          type="checkbox"
          className={clx(
            "sr-only",
            "focus:ring-2 focus:ring-accessible-primary focus:ring-offset-2"
          )}
          checked={checked}
          onChange={onChange}
          name={name}
          disabled={disabled}
          data-testid={dataTestId}
          aria-describedby={`${checkboxId}-description`}
        />
        <div
          className={clx(
            "w-6 h-6 rounded-md border-2 transition-all duration-200",
            "min-w-[24px] min-h-[24px]", // Ensure minimum touch target
            checked
              ? "bg-accessible-primary border-accessible-primary"
              : "bg-accessible-background border-accessible-border group-hover:border-accessible-borderDark",
            disabled && "opacity-50 cursor-not-allowed",
            "group-focus-within:ring-2 group-focus-within:ring-accessible-primary group-focus-within:ring-offset-2"
          )}
          role="presentation"
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white absolute top-0.5 left-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span 
        id={`${checkboxId}-description`}
        className={clx(
          "text-base select-none",
          "text-accessible-text",
          disabled && "text-accessible-textLight"
        )}
      >
        {label}
      </span>
    </label>
  )
}

export default CheckboxWithLabel
