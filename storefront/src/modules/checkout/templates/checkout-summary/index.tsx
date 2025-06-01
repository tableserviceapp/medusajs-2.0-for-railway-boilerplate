import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-28">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <Heading
          level="h2"
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          Order Summary
        </Heading>
        
        <div className="space-y-4 mb-6">
          <ItemsPreviewTemplate items={cart?.items} />
        </div>
        
        <Divider className="my-6" />
        
        <div className="mb-6">
          <DiscountCode cart={cart} />
        </div>
        
        <Divider className="my-6" />
        
        <CartTotals totals={cart} />
        
        <div className="mt-8 p-4 bg-pink-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-pink-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span className="font-medium">Free gift wrapping on all orders!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
