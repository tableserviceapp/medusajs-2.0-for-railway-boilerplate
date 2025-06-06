"use client"

import { useRef, useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

interface TrendingTreatsProps {
  products?: HttpTypes.StoreProduct[]
}

const TrendingTreats = ({ products = [] }: TrendingTreatsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 408
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 408
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollAmount = index * 408
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Track scroll position to update active dot
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const newIndex = Math.round(scrollLeft / 408)
        setCurrentIndex(newIndex)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Fallback products if no real products are provided
  const fallbackProducts = [
    {
      name: "Mixed Mini Brownie Box",
      price: "£17.99",
      originalPrice: "£22.99",
      rating: 4.5,
      reviews: 601,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Passionfruit And Pistachio Cake",
      price: "£28.99",
      rating: 4.8,
      reviews: 428,
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Chocolate Fudge Caramel Cake",
      price: "£28.99",
      rating: 4.7,
      reviews: 280,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Happy Birthday Celebration Box",
      price: "£19.99",
      rating: 4.9,
      reviews: 164,
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Vegan Carrot Cake",
      price: "£24.99",
      rating: 4.6,
      reviews: 195,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Strawberry Shortcake",
      price: "£26.99",
      rating: 4.8,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Lemon Drizzle Cake",
      price: "£22.99",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Chocolate Brownie Stack",
      price: "£25.99",
      rating: 4.9,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Victoria Sponge Cake",
      price: "£21.99",
      rating: 4.6,
      reviews: 143,
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    },
    {
      name: "Red Velvet Cupcakes",
      price: "£18.99",
      rating: 4.8,
      reviews: 298,
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&h=500&fit=crop",
      badge: "Add A Gifting Sleeve",
      href: "/categories/trending-treats"
    }
  ]

  // Use real products if available, otherwise use fallback
  const displayProducts = products.length > 0 ? products : fallbackProducts

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="content-container">
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">TRENDING TREATS</h2>
          <div className="hidden sm:flex items-center space-x-2">
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
          className="flex space-x-3 sm:space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.map((product, index) => {
            // Handle both real products and fallback products
            const isRealProduct = 'id' in product
            const productName = isRealProduct ? (product as HttpTypes.StoreProduct).title : (product as any).name
            const productImage = isRealProduct 
              ? (() => {
                  const realProduct = product as HttpTypes.StoreProduct
                  // Override image for baby sponge cakes
                  if (realProduct.title?.toLowerCase().includes('baby sponge')) {
                    return "https://bucket-production-47b2.up.railway.app/medusa-media/647539be66280b48828ad1d1eb3e4cf1-01JW11BNQYS2ZE2JG69XQHKH1C.jpg"
                  }
                  return realProduct.thumbnail || realProduct.images?.[0]?.url || "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop"
                })()
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
            const productRating = isRealProduct ? 4.5 : (product as any).rating
            // Use product ID to generate consistent review count (no Math.random to avoid hydration errors)
            const productReviews = isRealProduct 
              ? ((product as HttpTypes.StoreProduct).id ? (parseInt((product as HttpTypes.StoreProduct).id!.slice(-2), 16) % 400) + 100 : 250)
              : (product as any).reviews

            return (
              <LocalizedClientLink key={isRealProduct ? (product as HttpTypes.StoreProduct).id : index} href={productHref}>
                <div className="group flex-shrink-0 w-64 sm:w-80 md:w-96 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        Trending
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-left">
                    <h3 className="font-normal text-sm sm:text-base text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
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
                      {!isRealProduct && (product as any).originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {(product as any).originalPrice}
                        </span>
                      )}
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
            {displayProducts.slice(0, Math.min(displayProducts.length, 6)).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer hover:scale-125 ${
                  index === currentIndex ? 'bg-pink-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendingTreats 