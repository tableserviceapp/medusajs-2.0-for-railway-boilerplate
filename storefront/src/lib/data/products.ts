import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { cache } from "react"
import { getRegion } from "./regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { sortProducts } from "@lib/util/sort-products"

const PRODUCT_FIELDS = "id,title,description,handle,images,metadata,thumbnail,collection_id,type_id,weight,length,height,width,hs_code,origin_country,mid_code,material,created_at,updated_at,options,tags,variants,variants.title,variants.options,variants.options.option,variants.options.value,*variants.calculated_price,+variants.inventory_quantity"

export const getProductsById = cache(async function ({
  ids,
  regionId,
}: {
  ids: string[]
  regionId: string
}) {
  if (!Array.isArray(ids) || ids.length === 0 || !regionId) {
    console.error("getProductsById: Invalid ids or regionId", { ids, regionId })
    console.trace()
    return []
  }
  try {
    const result = await sdk.store.product
      .list(
        {
          id: ids,
          region_id: regionId,
          fields: PRODUCT_FIELDS,
        },
        { 
          expand: 'variants.options.option,images', 
          next: { 
            tags: ["products"]
          } 
        }
      )
      .then(({ products }) => {
        // Debug image data
        products.forEach(product => {
          console.log(`Product: ${product.title}`)
          console.log(`  - Thumbnail: ${product.thumbnail || 'null'}`)
          console.log(`  - Images count: ${product.images?.length || 0}`)
          if (product.images && product.images.length > 0) {
            product.images.forEach((img, index) => {
              console.log(`    Image ${index + 1}: ${img.url}`)
            })
          } else {
            console.log(`    ❌ NO IMAGES FOUND`)
          }
          console.log(`  ---`)
        })
        return products
      })
    return result
  } catch (err) {
    console.error("getProductsById error:", err)
    return []
  }
})

export const getProductByHandle = cache(async function (
  handle: string,
  regionId: string
) {
  return sdk.store.product
    .list(
      {
        handle,
        region_id: regionId,
        fields: PRODUCT_FIELDS,
      },
      { 
        expand: 'variants.options.option,images', 
        next: { 
          tags: ["products"]
        } 
      }
    )
    .then(({ products }) => {
      const product = products[0]
      if (product) {
        console.log(`Single Product: ${product.title}`)
        console.log(`  - Thumbnail: ${product.thumbnail || 'null'}`)
        console.log(`  - Images count: ${product.images?.length || 0}`)
        if (product.images && product.images.length > 0) {
          product.images.forEach((img, index) => {
            console.log(`    Image ${index + 1}: ${img.url}`)
          })
        }
      }
      return product
    })
})

export const getProductsList = cache(async function ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12
  const validPageParam = Math.max(pageParam, 1);
  const offset = (validPageParam - 1) * limit
  const region = await getRegion(countryCode)

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }
  return sdk.store.product
    .list(
      {
        limit,
        offset,
        region_id: region.id,
        fields: PRODUCT_FIELDS,
        ...queryParams,
      },
      { 
        expand: 'variants.options.option,images,thumbnail,variants,collection,type,tags',
        next: { 
          tags: ["products"]
        } 
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
})

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const getProductsListWithSort = cache(async function ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 1,
    queryParams: {
      ...queryParams,
      limit: 100,
      fields: PRODUCT_FIELDS,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = Math.max(page - 1, 0) * limit

  const nextPage = count > pageParam + limit ? page + 1 : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
})

export const getProductsByCategoryHandle = cache(async function (
  categoryHandle: string,
  countryCode: string,
  limit: number = 4
): Promise<HttpTypes.StoreProduct[]> {
  const region = await getRegion(countryCode)

  if (!region) {
    return []
  }

  // First get the category by handle
  const { getCategoryByHandle } = await import("@lib/data/categories")
  
  try {
    const { product_categories } = await getCategoryByHandle([categoryHandle])
    
    if (!product_categories || product_categories.length === 0) {
      console.log(`No category found for handle: ${categoryHandle}`)
      return []
    }

    const category = product_categories[0]
    console.log(`Found category: ${category.name} (${category.id}) for handle: ${categoryHandle}`)

    // Then get products for that category
    const { response } = await getProductsList({
      pageParam: 1,
      queryParams: {
        category_id: [category.id],
        limit,
        fields: PRODUCT_FIELDS,
      } as any,
      countryCode,
    })

    console.log(`Fetched ${response.products.length} products for category ${categoryHandle}:`, response.products.map(p => p.title))
    return response.products
  } catch (error) {
    console.error('Error fetching products by category handle:', error)
    return []
  }
})

// Add a function to manually trigger product cache revalidation from the frontend
export async function revalidateProductCache(productId?: string) {
  try {
    const response = await fetch('/api/webhooks/product-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': process.env.WEBHOOK_SECRET || 'your-webhook-secret',
      },
      body: JSON.stringify({
        event: 'product.updated',
        data: {
          id: productId || 'manual-refresh',
          timestamp: new Date().toISOString(),
        },
      }),
    })
    return response.ok
  } catch (error) {
    console.error('Failed to revalidate cache:', error)
    return false
  }
}
