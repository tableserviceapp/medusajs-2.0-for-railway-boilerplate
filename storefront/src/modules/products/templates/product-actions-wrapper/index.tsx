import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"

/**
 * Renders the product actions component with the provided product data.
 */
export default function ProductActionsWrapper({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  if (!product) {
    return null
  }

  return <ProductActions product={product} region={region} />
}
