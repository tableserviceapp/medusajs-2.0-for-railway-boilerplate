import React from "react"
import { clx } from "@medusajs/ui"

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  ariaLabel?: string
  className?: string
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  ariaLabel,
  className,
  disabled,
  type = "button",
  ...props
}) => {
  const baseClasses = clx(
    // Base styles
    "inline-flex items-center justify-center font-semibold rounded-lg",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "touch-target accessible-focus",
    
    // Size variants
    {
      "px-3 py-2 text-sm min-h-[36px]": size === "sm",
      "px-4 py-3 text-base min-h-[44px]": size === "md", 
      "px-6 py-4 text-lg min-h-[52px]": size === "lg",
    },
    
    // Style variants
    {
      // Primary button
      "bg-accessible-primary text-white border-2 border-accessible-primary hover:bg-accessible-primaryDark hover:border-accessible-primaryDark focus:ring-accessible-primary": 
        variant === "primary",
      
      // Secondary button  
      "bg-accessible-secondary text-white border-2 border-accessible-secondary hover:bg-opacity-90 focus:ring-accessible-secondary": 
        variant === "secondary",
      
      // Outline button
      "bg-transparent text-accessible-primary border-2 border-accessible-primary hover:bg-accessible-primary hover:text-white focus:ring-accessible-primary": 
        variant === "outline",
      
      // Ghost button
      "bg-transparent text-accessible-text border-2 border-transparent hover:bg-accessible-backgroundAlt focus:ring-accessible-primary": 
        variant === "ghost",
    },
    
    className
  )

  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={isDisabled}
      aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default AccessibleButton 