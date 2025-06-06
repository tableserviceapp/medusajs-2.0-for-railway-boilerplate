import React from "react"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"

const PRODUCT_LIMIT = 50

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export default async function PaginatedProducts({
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
}) {
  // Debug: Log the categoryId being used
  console.log("PaginatedProducts - categoryId:", categoryId)
  console.log("PaginatedProducts - collectionId:", collectionId)
  console.log("PaginatedProducts - countryCode:", countryCode)

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await getProductsList({
    pageParam: page,
    queryParams,
    countryCode,
  })

  // Debug: Log products and their image data
  console.log(`PaginatedProducts - Fetched ${products.length} products out of ${count} total`)
  console.log('PaginatedProducts - Query params:', queryParams)

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  // Server-side debugging (will show in terminal)
  console.log("🔍 PaginatedProducts Debug:")
  console.log("  - categoryId:", categoryId)
  console.log("  - products count:", count)
  console.log("  - products found:", products.length)
  if (products.length === 0) {
    console.log("  ❌ NO PRODUCTS FOUND!")
  } else {
    console.log("  ✅ First product handle:", products[0]?.handle)
    console.log("  ✅ First product thumbnail:", products[0]?.thumbnail)
    
    // Special debug for the Dad brownie box product
    const dadProduct = products.find(p => p.handle?.includes('me-being-dad'))
    if (dadProduct) {
      console.log("🎯 DAD BROWNIE BOX PRODUCT DEBUG:")
      console.log("  - Title:", dadProduct.title)
      console.log("  - Handle:", dadProduct.handle)
      console.log("  - Thumbnail:", dadProduct.thumbnail)
      console.log("  - Images array:", dadProduct.images)
      console.log("  - Images count:", dadProduct.images?.length || 0)
      if (dadProduct.images && dadProduct.images.length > 0) {
        console.log("  - First image URL:", dadProduct.images[0]?.url)
        console.log("  - First image data:", dadProduct.images[0])
      }
    }

    // Debug ALL products to see which ones have images
    console.log("🔍 ALL PRODUCTS IMAGE DEBUG:")
    products.forEach((product, index) => {
      console.log(`Product ${index + 1}: ${product.title}`)
      console.log(`  - Handle: ${product.handle}`)
      console.log(`  - Thumbnail: ${product.thumbnail}`)
      console.log(`  - Images count: ${product.images?.length || 0}`)
      if (product.images && product.images.length > 0) {
        product.images.forEach((img, imgIndex) => {
          console.log(`    - Image ${imgIndex + 1}: ${img?.url}`)
        })
      } else {
        console.log(`    - ❌ NO IMAGES FOUND`)
      }
      console.log(`  ---`)
    })
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
      <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
          </div>
      )}
      </div>
    </div>
  )
}
