import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { clx } from "@medusajs/ui"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, className, error, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useEffect(() => {
      setHasValue(!!props.value || !!props.defaultValue)
    }, [props.value, props.defaultValue])

    useImperativeHandle(ref, () => inputRef.current!)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 text-sm font-medium text-gray-700">{topLabel}</Label>
        )}
        <div className="relative">
          <input
            type={inputType}
            name={name}
            required={required}
            className={clx(
              "peer w-full px-4 py-3 pt-6 pb-2",
              "bg-white border-2 rounded-xl",
              "text-gray-900 placeholder-transparent",
              "transition-all duration-200",
              "focus:outline-none focus:ring-0",
              "hover:border-gray-300",
              error 
                ? "border-red-500 focus:border-red-500" 
                : "border-gray-200 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-500/10",
              "disabled:bg-gray-50 disabled:text-gray-500",
              className
            )}
            placeholder={label}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            onInvalid={(e) => {
              e.preventDefault()
            }}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            className={clx(
              "absolute left-4 transition-all duration-200 pointer-events-none",
              "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4",
              "peer-focus:text-xs peer-focus:-top-2 peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white",
              "text-xs -top-2 left-3 px-1 bg-white",
              hasValue || props.value ? "text-gray-600" : "",
              isFocused && !error ? "text-pink-600" : "",
              error ? "text-red-500" : ""
            )}
          >
            {label}
            {required && <span className="text-pink-500 ml-1">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-150"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
