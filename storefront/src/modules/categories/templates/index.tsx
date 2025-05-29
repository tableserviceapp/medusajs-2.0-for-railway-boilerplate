import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  categories,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

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
            {parents.map((parent, index) => (
              <div key={parent.id} className="flex items-center space-x-2">
                <LocalizedClientLink
                  className="text-gray-500 hover:text-pink-600 transition-colors duration-200 font-medium"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
            <span className="text-gray-800 font-semibold">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Polished Title Header */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="content-container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Category Title with Enhanced Animation */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 relative inline-block group" data-testid="category-page-title">
                {category.name}
                {/* Enhanced Animated Underline */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-500 transition-all duration-500 ease-out group-hover:w-full rounded-full shadow-lg"></div>
                {/* Subtle glow effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-orange-500 transition-all duration-500 ease-out group-hover:w-full rounded-full blur-sm opacity-50"></div>
              </h1>
              
              {/* Enhanced Subtitle */}
              <div className="max-w-3xl mx-auto">
                {category.description ? (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                    {category.description}
                  </p>
                ) : (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                    Discover our handcrafted collection of premium <span className="text-pink-600 font-medium">{category.name.toLowerCase()}</span>, 
                    made with love and delivered fresh to your door
                  </p>
                )}
              </div>
            </div>

            {/* Category Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Filter Dropdowns */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="content-container py-4">
          <div className="flex items-center justify-between">
            {/* Location Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md shadow-sm transition-all duration-200">
                  LONDON
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-200">
                  NATIONWIDE
                </button>
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center space-x-4">
              {/* Flavour Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-pink-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <span>FLAVOUR</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Chocolate</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Vanilla</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Strawberry</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Lemon</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Red Velvet</a>
                  </div>
                </div>
              </div>

              {/* Dietary Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-pink-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <span>DIETARY</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Vegan</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Gluten Free</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Dairy Free</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Nut Free</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Sugar Free</a>
                  </div>
                </div>
              </div>

              {/* Occasions Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-pink-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <span>OCCASIONS</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Birthday</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Anniversary</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Wedding</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Thank You</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Congratulations</a>
                  </div>
                </div>
              </div>

              {/* Price Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-pink-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <span>PRICE</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Under £20</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">£20 - £40</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">£40 - £60</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">£60 - £100</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Over £100</a>
                  </div>
                </div>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-pink-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <span>SORT BY</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Featured</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Price: Low to High</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Price: High to Low</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Newest First</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150">Best Selling</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {category.category_children && category.category_children.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="content-container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our specialized collections to find exactly what you're looking for
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.category_children.map((c) => (
                <LocalizedClientLink key={c.id} href={`/categories/${c.handle}`}>
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-200">
                      {c.name}
                    </h3>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="content-container py-8" data-testid="category-container">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
