import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  product?: HttpTypes.StoreProduct
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  product,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = option.values?.map((v) => v.value)

  // Get variant titles for each option value
  const getVariantForOptionValue = (optionValue: string) => {
    if (!product?.variants) return null
    
    return product.variants.find(variant => 
      variant.options?.some(opt => 
        opt.option?.title === option.title && opt.value === optionValue
      )
    )
  }

  return (
    <div className="flex flex-col gap-y-3">
      <label className="text-sm font-medium text-gray-700">Select {title}</label>
      <div className="relative" data-testid={dataTestId}>
        <select
          value={current || ""}
          onChange={(e) => updateOption(option.title ?? "", e.target.value)}
          disabled={disabled}
              className={clx(
            "w-full h-12 px-4 pr-10 text-base border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200",
            {
              "bg-gray-100 cursor-not-allowed": disabled,
              "hover:border-gray-400": !disabled,
            }
          )}
          data-testid="option-select"
        >
          <option value="" disabled>
            Choose {title}
          </option>
          {filteredOptions?.map((v) => {
            const variant = getVariantForOptionValue(v ?? "")
            // Always use the variant title if present, otherwise fallback to the option value
            const displayText = variant?.title && variant.title.trim() !== "" ? variant.title : v
            return (
              <option key={v} value={v ?? ""}>
                {displayText}
              </option>
            )
          })}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default OptionSelect
