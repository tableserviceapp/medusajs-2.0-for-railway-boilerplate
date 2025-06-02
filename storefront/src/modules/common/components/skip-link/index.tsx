import React from "react"

interface SkipLinkProps {
  href?: string
  children?: React.ReactNode
}

const SkipLink: React.FC<SkipLinkProps> = ({ 
  href = "#main-content", 
  children = "Skip to main content" 
}) => {
  return (
    <a
      href={href}
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-accessible-primary focus:text-white focus:rounded focus:font-semibold focus:shadow-lg"
      onFocus={(e) => {
        // Ensure the link is visible when focused
        e.target.classList.remove('sr-only')
      }}
      onBlur={(e) => {
        // Hide the link when focus is lost
        e.target.classList.add('sr-only')
      }}
    >
      {children}
    </a>
  )
}

export default SkipLink 