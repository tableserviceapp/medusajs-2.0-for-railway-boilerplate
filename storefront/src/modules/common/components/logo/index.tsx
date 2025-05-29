import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <LocalizedClientLink href="/" className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Cake Box Gifts"
        width={240}
        height={160}
        className="h-16 w-auto md:h-20 lg:h-24"
        priority
      />
    </LocalizedClientLink>
  )
}

export default Logo 