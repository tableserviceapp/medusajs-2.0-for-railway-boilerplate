import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const providedSecret = request.headers.get('x-webhook-secret')
    if (providedSecret !== WEBHOOK_SECRET) {
      console.error('Invalid webhook secret')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    console.log('🔄 Received webhook:', body)

    const { event, data } = body

    if (event === 'product.updated' || event === 'product.created' || 
        event === 'product-media.attached' || event === 'product-media.detached') {
      
      console.log(`🚀 Revalidating cache for product: ${data.id}`)
      
      // Revalidate product cache tags
      revalidateTag('products')
      revalidateTag('collections')
      
      // Also revalidate specific paths that might show this product
      revalidatePath('/', 'layout') // Homepage
      revalidatePath('/[countryCode]', 'layout') // All country pages
      revalidatePath('/[countryCode]/categories/[...category]', 'page') // Category pages
      revalidatePath('/[countryCode]/products/[handle]', 'page') // Product pages
      
      console.log('✅ Cache revalidated successfully')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Cache revalidated',
        productId: data.id,
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received but no action taken',
      event 
    })

  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// Also handle GET for webhook verification
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    endpoint: 'product-update-webhook',
    timestamp: new Date().toISOString()
  })
} 