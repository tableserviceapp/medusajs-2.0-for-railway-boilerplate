import React from "react"
import { clx } from "@medusajs/ui"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          name={name}
          data-testid={dataTestId}
        />
        <div
          className={clx(
            "w-5 h-5 rounded-md border-2 transition-all duration-200",
            checked
              ? "bg-pink-500 border-pink-500"
              : "bg-white border-gray-300 group-hover:border-gray-400"
          )}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white absolute top-0.5 left-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      <span className="text-base text-gray-700 select-none">
        {label}
      </span>
    </label>
  )
}

export default CheckboxWithLabel
