import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

// Function to capitalize first letter of each word
function capitalizeWords(str: string): string {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

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

  // Debug: Log category information
  console.log("CategoryTemplate - categories:", categories)
  console.log("CategoryTemplate - category (current):", category)
  console.log("CategoryTemplate - category.id:", category?.id)
  console.log("CategoryTemplate - category.handle:", category?.handle)
  console.log("CategoryTemplate - category.name:", category?.name)
  console.log("CategoryTemplate - parents:", parents)

  if (!category || !countryCode) notFound()

  return (
    <div className="bg-white min-h-screen">
      {/* Enhanced Breadcrumbs */}
      <div className="bg-white">
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
                  {capitalizeWords(parent.name)}
                </LocalizedClientLink>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
            <span className="text-gray-800 font-semibold">{capitalizeWords(category.name)}</span>
          </nav>
        </div>
      </div>

      {/* Polished Title Header */}
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="content-container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Category Title with Enhanced Animation */}
            <div className="mb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 relative inline-block" data-testid="category-page-title">
                {capitalizeWords(category.name)}
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
