import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
  ariaLabel,
}: {
  id: string
  children?: React.ReactNode
  className?: string
  ariaLabel?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  const buttonAriaLabel = ariaLabel || children?.toString() || "Delete item"

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className={clx(
          "flex gap-x-1 text-accessible-text hover:text-accessible-primary cursor-pointer",
          "touch-target-sm accessible-focus",
          "transition-colors duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-accessible-primary focus:ring-offset-2"
        )}
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
        aria-label={isDeleting ? "Deleting..." : buttonAriaLabel}
        aria-busy={isDeleting}
        type="button"
      >
        {isDeleting ? (
          <Spinner className="animate-spin" aria-hidden="true" />
        ) : (
          <Trash aria-hidden="true" />
        )}
        {children && <span>{children}</span>}
      </button>
    </div>
  )
}

export default DeleteButton
