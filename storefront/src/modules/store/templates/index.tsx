import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  page,
  countryCode,
}: {
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="bg-white min-h-screen">
      {/* Enhanced Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="content-container py-4">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <LocalizedClientLink
              href="/"
              className="text-gray-500 hover:text-pink-600 transition-colors duration-200 font-medium"
            >
              Home
            </LocalizedClientLink>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-800 font-semibold">All Products</span>
          </nav>
        </div>
      </div>

      {/* Polished Title Header */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="content-container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Store Title with Enhanced Animation */}
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 relative inline-block group" data-testid="store-page-title">
                All Products
                {/* Enhanced Animated Underline */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-500 transition-all duration-500 ease-out group-hover:w-full rounded-full shadow-lg"></div>
                {/* Subtle glow effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-500 transition-all duration-500 ease-out group-hover:w-full rounded-full blur-sm opacity-50"></div>
              </h1>
              
              {/* Enhanced Subtitle */}
              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                  Discover our complete collection of <span className="text-pink-600 font-medium">premium cakes and treats</span>, 
                  handcrafted with love and delivered fresh to your door
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Products Grid */}
      <div className="content-container py-8" data-testid="category-container">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
