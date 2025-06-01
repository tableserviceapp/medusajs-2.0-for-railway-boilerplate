"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"
import { HttpTypes } from "@medusajs/types"

type CartTotalsProps = {
  totals: HttpTypes.StoreCart | {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  // Handle both cart object and totals object structures
  const isCart = 'items' in totals
  
  const currency_code = totals.currency_code
  const total = isCart ? totals.total : totals.total
  const subtotal = isCart ? totals.subtotal : totals.subtotal
  const tax_total = isCart ? totals.tax_total : totals.tax_total
  const discount_total = isCart ? totals.discount_total : totals.discount_total
  const gift_card_total = isCart ? totals.gift_card_total : totals.gift_card_total
  
  // Calculate shipping total from shipping methods if it's a cart
  let shipping_total = 0
  if (isCart && totals.shipping_methods && totals.shipping_methods.length > 0) {
    shipping_total = totals.shipping_methods.reduce((acc, method) => {
      return acc + (method.amount || 0)
    }, 0)
  } else if (!isCart) {
    shipping_total = totals.shipping_total || 0
  }

  return (
    <div>
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between text-gray-600">
          <span className="text-base">
            Subtotal
          </span>
          <span data-testid="cart-subtotal" data-value={subtotal || 0} className="text-base font-medium text-gray-900">
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-base">Discount</span>
            <span
              className="text-base font-medium text-green-600"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-gray-600">
          <span className="text-base">Shipping</span>
          <span data-testid="cart-shipping" data-value={shipping_total || 0} className="text-base font-medium text-gray-900">
            {shipping_total > 0 
              ? convertToLocale({ amount: shipping_total, currency_code })
              : "Calculated at checkout"
            }
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="text-base">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0} className="text-base font-medium text-gray-900">
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-base">Gift card</span>
            <span
              className="text-base font-medium text-green-600"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full bg-gray-200 my-6" />
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span
          className="text-2xl font-bold text-gray-900"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
