"use client"

import React, { useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"

interface DynamicCategorySectionProps {
  category: {
    id: string
    name: string
    handle: string
    metadata?: any
  }
  products: HttpTypes.StoreProduct[]
  maxProducts?: number
}

// Helper function to get category-specific styling and settings
const getCategoryConfig = (categoryHandle: string, metadata?: any) => {
  // Check for custom configuration in metadata first
  if (metadata) {
    return {
      title: metadata.display_title || metadata.title || categoryHandle.replace(/-/g, ' ').toUpperCase(),
      emoji: metadata.emoji || "🍰",
      description: metadata.description || `Discover our amazing ${categoryHandle.replace(/-/g, ' ')} collection`,
      badgeText: metadata.badge_text || categoryHandle.replace(/-/g, ' '),
      primaryColor: metadata.primary_color || "pink",
      gradientFrom: metadata.gradient_from || "pink-500",
      gradientTo: metadata.gradient_to || "pink-600",
      linkText: metadata.link_text || `View All ${categoryHandle.replace(/-/g, ' ')}`,
      linkHref: metadata.link_href || `/categories/${categoryHandle}`
    }
  }

  // Default configurations for known categories
  const configs: { [key: string]: any } = {
    'trending-treats': {
      title: "TRENDING TREATS",
      emoji: "",
      description: "Our most popular treats that customers absolutely love!",
      badgeText: "Trending",
      primaryColor: "orange",
      gradientFrom: "orange-500",
      gradientTo: "pink-500",
      linkText: "View All Trending",
      linkHref: `/categories/trending-treats`
    },
    'birthday-cakes': {
      title: "BIRTHDAY CAKE COLLECTION",
      emoji: "🎂",
      description: "Perfect birthday cakes to make every celebration special!",
      badgeText: "Birthday",
      primaryColor: "pink",
      gradientFrom: "pink-500",
      gradientTo: "pink-600",
      linkText: "View All Birthday Cakes",
      linkHref: `/categories/birthday-cakes`
    },
    'vegan-cakes': {
      title: "VEGAN BEST SELLERS",
      emoji: "🌱",
      description: "Our most popular plant-based treats that customers absolutely love!",
      badgeText: "Vegan",
      primaryColor: "green",
      gradientFrom: "green-500",
      gradientTo: "green-600",
      linkText: "View All Vegan Products",
      linkHref: `/categories/vegan-cakes`
    },
    'fathers-day': {
      title: "FATHER'S DAY SPECIALS",
      emoji: "👨‍👧‍👦",
      description: "Special treats to celebrate the amazing dads in your life!",
      badgeText: "Father's Day",
      primaryColor: "blue",
      gradientFrom: "blue-500",
      gradientTo: "blue-600",
      linkText: "View All Father's Day",
      linkHref: `/categories/fathers-day`
    }
  }

  return configs[categoryHandle] || {
    title: categoryHandle.replace(/-/g, ' ').toUpperCase(),
    emoji: "🍰",
    description: `Discover our amazing ${categoryHandle.replace(/-/g, ' ')} collection`,
    badgeText: categoryHandle.replace(/-/g, ' '),
    primaryColor: "gray",
    gradientFrom: "gray-500",
    gradientTo: "gray-600",
    linkText: `View All ${categoryHandle.replace(/-/g, ' ')}`,
    linkHref: `/categories/${categoryHandle}`
  }
}

const DynamicCategorySection = ({ 
  category, 
  products = [], 
  maxProducts = 8 
}: DynamicCategorySectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const config = getCategoryConfig(category.handle, category.metadata)

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

  // Limit products to maxProducts
  const displayProducts = products.slice(0, maxProducts)

  if (displayProducts.length === 0) {
    return null // Don't render section if no products
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="content-container">
        <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
          <div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3`}>
              {config.emoji && <span className="text-2xl sm:text-3xl md:text-4xl">{config.emoji}</span>}
              {config.title}
            </h2>
            <p className={`text-sm sm:text-base md:text-lg text-${config.primaryColor}-600 mt-2`}>
              {config.description}
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <button 
              onClick={scrollLeft}
              className={`w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-${config.primaryColor}-500 transition-all duration-200 hover:scale-105`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className={`w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 hover:text-${config.primaryColor}-500 transition-all duration-200 hover:scale-105`}
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
            const productImage = (() => {
              // Override image for baby sponge cakes
              if (product.title?.toLowerCase().includes('baby sponge')) {
                return "https://bucket-production-47b2.up.railway.app/medusa-media/647539be66280b48828ad1d1eb3e4cf1-01JW11BNQYS2ZE2JG69XQHKH1C.jpg"
              }
              return product.thumbnail || product.images?.[0]?.url || "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop"
            })()
            
            const productHref = `/products/${product.handle}`
            const { cheapestPrice } = getProductPrice({ product })
            const hasMultipleVariants = product.variants && product.variants.length > 1
            
            const productPrice = cheapestPrice?.calculated_price 
              ? (hasMultipleVariants ? `from ${cheapestPrice.calculated_price}` : cheapestPrice.calculated_price)
              : 'Price on request'
            
            const productRating = 4.5 + (Math.random() * 0.4) // Random rating between 4.5-4.9
            const productReviews = (parseInt(product.id!.slice(-2), 16) % 400) + 100

            return (
              <LocalizedClientLink key={product.id} href={productHref}>
                <div className="group flex-shrink-0 w-64 sm:w-80 md:w-96 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={productImage}
                      alt={product.title}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`bg-${config.primaryColor}-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
                        {config.badgeText}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-left">
                    <h3 className={`font-normal text-sm sm:text-base text-gray-900 mb-2 group-hover:text-${config.primaryColor}-600 transition-colors line-clamp-2`}>
                      {product.title}
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
            {displayProducts.slice(0, Math.min(displayProducts.length, 6)).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === 0 ? `bg-${config.primaryColor}-500` : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-8">
          <LocalizedClientLink href={config.linkHref}>
            <button className={`inline-flex items-center px-6 py-3 bg-${config.primaryColor}-600 text-white font-bold rounded-full hover:bg-${config.primaryColor}-700 transition-all duration-200 hover:scale-[1.02] shadow-lg`}>
              {config.linkText}
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

export default DynamicCategorySection 