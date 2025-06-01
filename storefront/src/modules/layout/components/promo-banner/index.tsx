'use client'
import React, { useEffect, useState } from "react"

const promoMessages = [
  "FREE DELIVERY ON ORDERS OVER £40",
  "ORDER BEFORE 1PM, FOR NEXT DAY DELIVERY"
]

const DISPLAY_INTERVAL = 5000 // ms

const PromoBanner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoMessages.length)
    }, DISPLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-gray-800 overflow-hidden shadow-lg flex items-center justify-center" style={{ backgroundColor: '#fff2ec', minHeight: 40, height: 40 }}>
      <span className="text-sm font-semibold drop-shadow-sm text-center w-full">
        {promoMessages[current]}
      </span>
    </div>
  )
}

export default PromoBanner 