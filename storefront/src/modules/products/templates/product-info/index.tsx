import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="space-y-4">
        {product.description && (
        <Text
            className="text-gray-600 leading-relaxed"
          data-testid="product-description"
        >
          {product.description}
        </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
