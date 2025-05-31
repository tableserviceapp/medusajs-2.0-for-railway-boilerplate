interface ProductData {
  id: string
  title: string
  description: string
  handle: string
  options: Array<{
    id: string
    title: string
    values: string[]
  }>
  variants: Array<{
    id: string
    title: string
    options: Array<{
      id: string
      value: string
      option_id: string
    }>
  }>
}

export async function getProductWithOptions(id: string): Promise<ProductData> {
  const response = await fetch(`/api/product/${id}`)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch product")
  }

  const data = await response.json()
  return data.product
} 