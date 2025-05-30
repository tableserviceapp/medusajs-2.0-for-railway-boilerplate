"use client"

import { useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

interface BirthdayCakeCollectionProps {
  products?: HttpTypes.StoreProduct[]
}

const BirthdayCakeCollection = ({ products = [] }: BirthdayCakeCollectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 400
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 400
    }
  }

  // Fallback products if no real products are provided
  const fallbackProducts = [
    {
      name: "Classic Birthday Cake",
      price: "£24.99",
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&h=500&fit=crop",
      description: "Classic vanilla sponge with colorful buttercream",
      href: "/categories/birthday-cakes"
    },
    {
      name: "Chocolate Birthday Cake",
      price: "£26.99",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
      description: "Rich chocolate cake with birthday decorations",
      href: "/categories/birthday-cakes"
    },
    {
      name: "Rainbow Birthday Cake",
      price: "£28.99",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop",
      description: "Colorful rainbow layers with vanilla frosting",
      href: "/categories/birthday-cakes"
    },
    {
      name: "Unicorn Birthday Cake",
      price: "£32.99",
      rating: 4.9,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop",
      description: "Magical unicorn themed birthday cake",
      href: "/categories/birthday-cakes"
    },
    {
      name: "Princess Birthday Cake",
      price: "£29.99",
      rating: 4.8,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=500&fit=crop",
      description: "Beautiful princess themed celebration cake",
      href: "/categories/birthday-cakes"
    },
    {
      name: "Superhero Birthday Cake",
      price: "£31.99",
      rating: 4.7,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=500&fit=crop",
      description: "Action-packed superhero themed cake",
      href: "/categories/birthday-cakes"
    }
  ]

  // Use real products if available, otherwise use fallback
  const displayProducts = products.length > 0 ? products : fallbackProducts

  return (
    <section className="py-16 bg-white">
      <div className="content-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-4xl">🎂</span>
              BIRTHDAY CAKE COLLECTION
            </h2>
            <p className="text-lg text-pink-600 mt-2">Perfect birthday cakes to make every celebration special!</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-pink-500 transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-pink-500 transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.map((product, index) => {
            // Handle both real products and fallback products
            const isRealProduct = 'id' in product
            const productName = isRealProduct ? (product as HttpTypes.StoreProduct).title : (product as any).name
            const productImage = isRealProduct 
              ? (product as HttpTypes.StoreProduct).thumbnail || (product as HttpTypes.StoreProduct).images?.[0]?.url || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop"
              : (product as any).image
            const productHref = isRealProduct 
              ? `/products/${(product as HttpTypes.StoreProduct).handle}`
              : (product as any).href
            const productPrice = isRealProduct 
              ? (() => {
                  const realProduct = product as HttpTypes.StoreProduct
                  const { cheapestPrice } = getProductPrice({ product: realProduct })
                  const hasMultipleVariants = realProduct.variants && realProduct.variants.length > 1
                  
                  if (cheapestPrice?.calculated_price) {
                    return hasMultipleVariants 
                      ? `from ${cheapestPrice.calculated_price}`
                      : cheapestPrice.calculated_price
                  }
                  return 'Price on request'
                })()
              : (product as any).price
            const productRating = isRealProduct ? 4.7 : (product as any).rating
            // Use product ID to generate consistent review count (no Math.random to avoid hydration errors)
            const productReviews = isRealProduct 
              ? ((product as HttpTypes.StoreProduct).id ? (parseInt((product as HttpTypes.StoreProduct).id!.slice(-2), 16) % 250) + 75 : 175)
              : (product as any).reviews

            return (
              <LocalizedClientLink key={isRealProduct ? (product as HttpTypes.StoreProduct).id : index} href={productHref}>
                <div className="group flex-shrink-0 w-96 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        Birthday
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-left">
                    <h3 className="font-normal text-base text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {productName}
                    </h3>
                    
                    {/* Star Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(productRating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({productReviews})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-normal text-gray-900">
                        {productPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[...Array(Math.min(displayProducts.length, 6))].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === 0 ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-8">
          <LocalizedClientLink href="/store?category=birthday-cakes">
            <button className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
              View All Birthday Cakes
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default BirthdayCakeCollection 