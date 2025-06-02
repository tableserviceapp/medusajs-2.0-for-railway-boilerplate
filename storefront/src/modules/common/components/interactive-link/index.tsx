import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  ariaLabel?: string
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ariaLabel,
  className,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={clx(
        "flex gap-x-1 items-center group",
        "touch-target-sm accessible-focus",
        "transition-colors duration-200",
        "hover:text-accessible-primary focus:text-accessible-primary",
        "focus:outline-none focus:ring-2 focus:ring-accessible-primary focus:ring-offset-2",
        className
      )}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      <Text className="text-accessible-primary group-hover:text-accessible-primaryDark">
        {children}
      </Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="currentColor"
        aria-hidden="true"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
