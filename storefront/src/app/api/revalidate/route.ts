import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from environment or request
    const token = request.nextUrl.searchParams.get('token')
    const category = request.nextUrl.searchParams.get('category')
    const path = request.nextUrl.searchParams.get('path')
    
    // Verify the token (optional security measure)
    if (token !== process.env.REVALIDATE_TOKEN && process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    console.log('🔄 Starting cache revalidation...')
    
    // Revalidate cache tags
    revalidateTag('products')
    revalidateTag('categories')
    console.log('✅ Revalidated cache tags: products, categories')
    
    // If specific category is provided, revalidate that category path
    if (category) {
      revalidatePath(`/*/categories/${category}`)
      console.log(`✅ Revalidated category path: /*/categories/${category}`)
    }
    
    // If specific path is provided, revalidate that path
    if (path) {
      revalidatePath(path)
      console.log(`✅ Revalidated specific path: ${path}`)
    }
    
    // Revalidate common paths that might be affected by product changes
    const commonPaths = [
      '/', // Home page
      '/*/categories/fathers-day',
      '/*/categories/birthday-cakes',
      '/*/categories/vegan-cakes'
    ]
    
    for (const path of commonPaths) {
      revalidatePath(path)
    }
    console.log('✅ Revalidated common category paths')
    
    return NextResponse.json({ 
      revalidated: true, 
      timestamp: new Date().toISOString(),
      revalidatedPaths: category ? [`/*/categories/${category}`, ...commonPaths] : commonPaths
    })
  } catch (err) {
    console.error('❌ Error during revalidation:', err)
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
} 