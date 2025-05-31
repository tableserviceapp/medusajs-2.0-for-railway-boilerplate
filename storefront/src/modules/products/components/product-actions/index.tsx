"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const params = useParams()
  const countryCode = params?.countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  useEffect(() => {
    if (product.options && product.options.length > 0 && product.variants && product.variants.length > 0) {
      console.log('Product options:', product.options)
      console.log('First variant options:', product.variants[0].options)
    }
    // Log all variants for debugging
    console.log('Dropdown variants:', product.variants)
  }, [product.options, product.variants]);

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        
        {/* Product Price */}
        <div className="border-b border-gray-200 pb-4">
          <ProductPrice product={product} variant={selectedVariant} />
        </div>

        {/* Product Options */}
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <>
              {(product.options && product.options.length > 0) ? (
                <div className="space-y-6">
                  {(product.options || []).map((option) => {
                    return (
                      <div key={option.id}>
                        <OptionSelect
                          option={option}
                          current={options[option.title ?? ""]}
                          updateOption={setOptionValue}
                          title={option.title ?? ""}
                          product={product}
                          data-testid="product-options"
                          disabled={!!isAdding || !!disabled}
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-y-3">
                  <label className="text-sm font-medium text-gray-700">Select Variant</label>
                  <select
                    value={selectedVariant?.id || ""}
                    onChange={e => {
                      const variant = (product.variants ?? []).find(v => v.id === e.target.value)
                      if (variant) {
                        setOptions(optionsAsKeymap(variant.options))
                      }
                    }}
                    className="w-full h-12 px-4 pr-10 text-base border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    disabled={!!isAdding || !!disabled}
                  >
                    <option value="" disabled>Select variant</option>
                    {(product.variants ?? []).map((variant, idx) => {
                      // Always use the variant title if present
                      let label = variant.title && variant.title.trim() !== '' ? variant.title : undefined
                      if (!label) {
                        if (variant.options && variant.options.length > 0) {
                          label = variant.options.map(opt => {
                            const productOption = (product.options || []).find(o => o.id === opt.option_id)
                            // Remove any leading colon or extra characters
                            return `${productOption?.title ? productOption.title + ' ' : ''}${opt.value ?? ''}`
                          }).join(' / ')
                        } else {
                          label = `Variant ${idx + 1}`
                        }
                      }
                      // Remove any accidental leading colon or whitespace
                      label = label?.replace(/^\s*:\s*/, '')
                      return (
                        <option key={variant.id} value={variant.id}>{label}</option>
                      )
                    })}
                  </select>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-12 text-center font-medium">1</span>
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!isAdding || !!disabled}
          variant="primary"
          className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-colors duration-200"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "ADD TO CART"}
        </Button>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!isAdding || !!disabled}
        />
      </div>
    </>
  )
}
