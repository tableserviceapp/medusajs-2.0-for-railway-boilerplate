"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

export default function CacheRefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setStatus("🔄 Clearing cache...")
    
    try {
      // Call our webhook endpoint to clear cache
      const response = await fetch('/api/webhooks/product-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': 'your-webhook-secret',
        },
        body: JSON.stringify({
          event: 'product.updated',
          data: {
            id: 'manual-refresh',
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (response.ok) {
        setStatus("✅ Cache cleared!")
        setLastRefresh(new Date().toLocaleTimeString())
        
        // Wait a moment then reload
        setTimeout(() => {
          setStatus("🔄 Reloading page...")
          window.location.reload()
        }, 1000)
      } else {
        setStatus("❌ Cache clear failed")
        console.error('Failed to refresh cache')
      }
    } catch (error) {
      setStatus("❌ Error refreshing")
      console.error('Error refreshing cache:', error)
    } finally {
      setTimeout(() => {
        setIsRefreshing(false)
        setStatus("")
      }, 3000)
    }
  }

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col gap-3 min-w-[200px]">
        <div className="text-center">
          <h3 className="font-semibold text-sm text-gray-800">🛠️ Dev Tools</h3>
          <p className="text-xs text-gray-500">Live Backend Cache Control</p>
        </div>
        
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          size="small"
          variant="secondary"
          className="w-full"
        >
          {isRefreshing ? '🔄 Working...' : '🚀 Refresh Images'}
        </Button>
        
        {status && (
          <div className="text-xs text-center py-1">
            {status}
          </div>
        )}
        
        {lastRefresh && !isRefreshing && (
          <div className="text-xs text-gray-500 text-center">
            Last: {lastRefresh}
          </div>
        )}
        
        <div className="text-xs text-gray-400 text-center">
          Updates product images from:<br/>
          <code className="text-xs">admin.cakeboxgifts.co.uk</code>
        </div>
      </div>
    </div>
  )
} 