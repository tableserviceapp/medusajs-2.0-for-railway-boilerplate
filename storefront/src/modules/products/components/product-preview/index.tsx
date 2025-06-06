import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // Debug: Check product handle for links
  console.log("ProductPreview - product.handle:", product.handle)
  console.log("ProductPreview - product.id:", product.id)
  console.log("ProductPreview - Link will be:", `/products/${product.handle}`)

  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  // Debug: Compare original vs priced product handles
  console.log("ProductPreview - pricedProduct.handle:", pricedProduct.handle)
  console.log("ProductPreview - handles match:", product.handle === pricedProduct.handle)

  // Debug: Check image data being passed to Thumbnail
  console.log("ProductPreview - Image data for", pricedProduct.title, ":")
  console.log("  - Thumbnail:", pricedProduct.thumbnail || 'null')
  console.log("  - Images count:", pricedProduct.images?.length || 0)
  if (pricedProduct.images && pricedProduct.images.length > 0) {
    pricedProduct.images.forEach((img, index) => {
      console.log(`    Image ${index + 1}: ${img.url}`)
    })
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  // Check if product has multiple variants
  const hasMultipleVariants = product.variants && product.variants.length > 1

  // Debug: Check if handle exists and create proper link
  const productLink = pricedProduct.handle ? `/products/${pricedProduct.handle}` : '#'
  if (!pricedProduct.handle) {
    console.warn("ProductPreview - Product missing handle:", product.title, product.id)
  }

  // Mock data for enhanced display - in real implementation, this would come from product data
  const mockRating = 4.5
  // Use product ID to generate consistent review count (no Math.random to avoid hydration errors)
  const mockReviewCount = product.id ? (parseInt(product.id.slice(-2), 16) % 50) + 5 : 25
  const isNew = product.created_at ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false
  const hasOffer = cheapestPrice?.price_type === "sale"

  return (
    <LocalizedClientLink href={productLink} className="group">
      <div className="transition-all duration-300 group-hover:scale-[1.02]" data-testid="product-wrapper">
        {/* Product Image with Badges */}
        <div className="relative mb-4">
        <Thumbnail
          thumbnail={pricedProduct.thumbnail}
          images={pricedProduct.images}
            size="square"
          isFeatured={isFeatured}
            className="!p-0 !bg-transparent !shadow-none !rounded-none overflow-hidden"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                New!
              </span>
            )}
            {hasOffer && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Offer
              </span>
            )}
          </div>
        </div>

        {/* Product Info - Outside of image */}
        <div className="space-y-2">
          {/* Product Title */}
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200" data-testid="product-title">
            {product.title}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(mockRating)
                      ? 'text-yellow-400'
                      : i < mockRating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">{mockReviewCount} reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {cheapestPrice && (
              <div className="flex items-baseline gap-1">
                {hasMultipleVariants && (
                  <span className="text-sm text-gray-500">from</span>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  {cheapestPrice.calculated_price}
                </span>
              </div>
            )}
            {hasOffer && cheapestPrice?.original_price && (
              <span className="text-lg text-gray-500 line-through">
                {cheapestPrice.original_price}
              </span>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
