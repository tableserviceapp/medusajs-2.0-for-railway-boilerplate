import { sdk } from "@lib/config"
import { cache } from "react"

export const listCategories = cache(async function () {
  return sdk.store.category
    .list({ fields: "+category_children" }, { next: { tags: ["categories"] } })
    .then(({ product_categories }) => product_categories)
})

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
) {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { limit, offset },
    { next: { tags: ["categories"] } }
  )
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {

  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: categoryHandle },
    { next: { tags: ["categories"] } }
  )
})

// New function to get categories with metadata for homepage
export const getHomepageCategories = cache(async function () {
  console.log("🔍 Starting getHomepageCategories...")
  
  try {
    const result = await sdk.store.category
      .list(
        { fields: "id,name,handle,description,metadata,created_at,updated_at,+category_children" }, 
        { next: { tags: ["categories"] } }
      )
    
    console.log("📦 Raw API response:", JSON.stringify(result, null, 2))
    
    const { product_categories } = result
    
    if (!product_categories || product_categories.length === 0) {
      console.log("❌ No categories found at all!")
      return []
    }
    
    console.log(`📋 Total categories found: ${product_categories.length}`)
    
    // Log all categories with their metadata
    console.log("🔍 All categories with metadata:")
    product_categories.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat.name} (${cat.handle})`)
      console.log(`     - ID: ${cat.id}`)
      console.log(`     - Metadata:`, JSON.stringify(cat.metadata, null, 2))
      console.log(`     ---`)
    })
    
    // Filter categories that have HOMEPAGE = TRUE in metadata (handle both cases)
    const homepageCategories = product_categories.filter(category => {
      const hasHomepageFlag = category.metadata && 
        (
          category.metadata.homepage === true || 
          category.metadata.homepage === "true" || 
          category.metadata.homepage === "TRUE" ||
          category.metadata.HOMEPAGE === true || 
          category.metadata.HOMEPAGE === "true" ||
          category.metadata.HOMEPAGE === "TRUE"
        )
      
      if (hasHomepageFlag) {
        console.log(`✅ Found homepage category: ${category.name} (${category.handle})`)
      }
      
      return hasHomepageFlag
    })
    
    console.log(`🎯 Homepage categories found: ${homepageCategories.length}`)
    
    if (homepageCategories.length === 0) {
      console.log("⚠️  No categories have HOMEPAGE=TRUE metadata, will fall back to defaults")
    } else {
      console.log("🎉 Using these homepage categories:", homepageCategories.map(cat => cat.name))
    }
    
    return homepageCategories
    
  } catch (error) {
    console.error("❌ Error in getHomepageCategories:", error)
    return []
  }
})

// Test function to directly check trending-treats category
export const testTrendingTreatsCategory = cache(async function () {
  console.log("🧪 TESTING: Direct request to trending-treats category...")
  
  try {
    // Direct request to get trending-treats category with all fields
    const result = await sdk.store.category
      .list(
        { 
          handle: ["trending-treats"],
          fields: "id,name,handle,description,metadata,created_at,updated_at,+category_children"
        }, 
        { next: { tags: ["categories"] } }
      )
    
    console.log("🧪 TRENDING-TREATS DIRECT RESULT:")
    console.log(JSON.stringify(result, null, 2))
    
    if (result.product_categories && result.product_categories.length > 0) {
      const category = result.product_categories[0]
      console.log("🧪 TRENDING-TREATS CATEGORY DETAILS:")
      console.log("  - ID:", category.id)
      console.log("  - Name:", category.name)
      console.log("  - Handle:", category.handle)
      console.log("  - Metadata:", JSON.stringify(category.metadata, null, 2))
    } else {
      console.log("❌ No trending-treats category found!")
    }
    
    return result
    
  } catch (error) {
    console.error("❌ Error testing trending-treats category:", error)
    return null
  }
})
