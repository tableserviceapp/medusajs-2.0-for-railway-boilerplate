import React from "react"

const PromoBanner = () => {
  const promoMessages = [
    "🚚 Free delivery on orders over £39.50",
    "📅 Order up to 3 months in advance", 
    "⏰ Order by 4pm for next day delivery",
    "🎂 Handcrafted fresh daily",
    "✨ Premium ingredients only"
  ]

  return (
    <div className="text-gray-800 py-3 overflow-hidden shadow-lg" style={{ backgroundColor: '#fff2ec' }}>
      <div className="flex animate-scroll whitespace-nowrap">
        {promoMessages.map((message, index) => (
          <div key={index} className="flex items-center px-12 text-sm font-semibold">
            <span className="drop-shadow-sm">{message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromoBanner 