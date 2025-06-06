import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'

const STOREFRONT_WEBHOOK_URL = process.env.STOREFRONT_WEBHOOK_URL || 'https://your-storefront.railway.app/api/webhooks/product-update'
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret'

export default async function productUpdateHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  
  console.log(`🔄 Product updated: ${data.id}`)
  
  try {
    // Send webhook to storefront to trigger cache revalidation
    const response = await fetch(STOREFRONT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify({
        event: 'product.updated',
        data: {
          id: data.id,
          timestamp: new Date().toISOString(),
        },
      }),
    })

    if (!response.ok) {
      console.error(`❌ Failed to send webhook for product ${data.id}:`, response.status, response.statusText)
    } else {
      console.log(`✅ Successfully sent webhook for product ${data.id}`)
    }
  } catch (error) {
    console.error(`❌ Error sending webhook for product ${data.id}:`, error)
  }
}

export const config: SubscriberConfig = {
  event: [
    'product.updated',
    'product.created', 
    'product-media.attached',
    'product-media.detached'
  ]
} 