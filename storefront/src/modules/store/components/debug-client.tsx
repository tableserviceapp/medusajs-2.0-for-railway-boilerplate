"use client"
import { useEffect } from "react"

interface DebugClientProps {
  products: any[]
  count: number
  categoryId?: string
}

export default function DebugClient({ products, count, categoryId }: DebugClientProps) {
  useEffect(() => {
    console.log("=== BIRTHDAY CATEGORY DEBUG ===")
    console.log("CategoryId:", categoryId)
    console.log("Products count:", count)
    console.log("Products found:", products.length)
    console.log("Products:", products)
    
    if (products.length > 0) {
      console.log("First product:", products[0])
      console.log("First product handle:", products[0]?.handle)
      console.log("First product thumbnail:", products[0]?.thumbnail)
      console.log("First product images:", products[0]?.images)
    } else {
      console.log("❌ NO PRODUCTS FOUND for categoryId:", categoryId)
    }
  }, [products, count, categoryId])
  
  return null
} 