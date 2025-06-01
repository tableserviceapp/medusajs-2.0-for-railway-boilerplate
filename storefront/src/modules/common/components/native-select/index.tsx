import { clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

const ChevronUpDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
  </svg>
)

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  label?: string
  required?: boolean
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, label, required, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
        setHasValue(false)
      } else {
        setIsPlaceholder(false)
        setHasValue(true)
      }
    }, [innerRef.current?.value])

    useEffect(() => {
      setHasValue(!!props.value || !!defaultValue)
    }, [props.value, defaultValue])

    return (
      <div className="relative">
        <div
          onFocus={() => {
            innerRef.current?.focus()
            setIsFocused(true)
          }}
          onBlur={() => {
            innerRef.current?.blur()
            setIsFocused(false)
          }}
          className={clx(
            "relative flex items-center",
            "bg-white border-2 rounded-xl",
            "transition-all duration-200",
            "hover:border-gray-300",
            isFocused ? "border-pink-500 shadow-lg shadow-pink-500/10" : "border-gray-200",
            className
          )}
        >
          {label && (
            <label
              className={clx(
                "absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1",
                isPlaceholder && !isFocused ? "text-base text-gray-500 top-4" : "text-xs text-gray-600 -top-2 left-3",
                isFocused && "text-xs text-pink-600 -top-2 left-3"
              )}
            >
              {label}
              {required && <span className="text-pink-500 ml-1">*</span>}
            </label>
          )}
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setIsPlaceholder(e.target.value === "")
              setHasValue(e.target.value !== "")
              props.onChange?.(e)
            }}
            {...props}
            className={clx(
              "appearance-none flex-1 bg-transparent border-none",
              "px-4 py-3 pt-6 pb-2",
              "text-gray-900 outline-none",
              "transition-colors duration-150",
              "cursor-pointer",
              isPlaceholder && "text-gray-500"
            )}
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
            <ChevronUpDownIcon />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
