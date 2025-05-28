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
        className="h-20 w-auto md:h-28 lg:h-32"
        priority
      />
    </LocalizedClientLink>
  )
}

export default Logo 