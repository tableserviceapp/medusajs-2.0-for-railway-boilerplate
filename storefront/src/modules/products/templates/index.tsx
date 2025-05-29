import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
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
            {product.collection && (
              <>
                <LocalizedClientLink
                  href={`/collections/${product.collection.handle}`}
                  className="text-gray-500 hover:text-pink-600 transition-colors duration-200 font-medium"
                >
                  {product.collection.title}
                </LocalizedClientLink>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
            <span className="text-gray-800 font-semibold">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="bg-white">
        <div className="content-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar - Thumbnail Images */}
            <div className="lg:col-span-2">
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
                {product?.images?.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex-shrink-0 w-20 h-20 lg:w-full lg:h-24 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all duration-200"
                  >
                    {image.url && (
                      <img
                        src={image.url}
                        alt={`Product thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Main Product Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {product?.images?.[0]?.url && (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Add A Gifting Sleeve Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Add A Gifting Sleeve
                  </span>
                </div>

                {/* Zoom Icon */}
                <div className="absolute bottom-4 right-4">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                </div>

                {/* Image Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {product?.images?.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Product Details */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                
                {/* Product Title and Badges */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      100% Vegetarian
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      All Natural
                    </span>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">(428 Reviews)</span>
                  </div>
                </div>

                {/* Product Info Component */}
                <ProductInfo product={product} />

                {/* Product Actions */}
                <div className="border-t border-gray-200 pt-6">
                  <Suspense
                    fallback={
                      <ProductActions
                        disabled={true}
                        product={product}
                        region={region}
                      />
                    }
                  >
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>

                {/* Additional Features */}
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <span>Add a free gift message in the cart</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Order by 4.00pm for next day delivery from £5.95</span>
                    <button className="text-pink-600 hover:text-pink-700 font-medium">
                      Check delivery to your area
                    </button>
                  </div>
                </div>

                {/* Product Tabs */}
                <div className="border-t border-gray-200 pt-6">
                  <ProductTabs product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought With Section */}
      <div className="bg-rose-50 py-12">
        <div className="content-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Bought With</h2>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
