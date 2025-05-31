"use client"
import React, { useState } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

// Hardcoded list of brownie artwork images
const BROWNIE_ARTWORKS = [
  "Fathers day - 1.png",
  "Fathers day - 2-1.png",
  "Fathers day - 2.png",
  "Fathers day - 3.png",
  "Fathers day - 4.png",
  "Fathers day - 5.png"
]

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  // Debug: log the product object to catch missing/null fields
  console.log('ProductTemplate product:', product)

  if (!product || !product.id) {
    return notFound()
  }

  // Fallback: use thumbnail if images array is empty or missing
  const images = product.images && product.images.length > 0
    ? product.images
    : product.thumbnail
      ? [{
          url: product.thumbnail,
          id: 'thumbnail-fallback',
          metadata: null,
          rank: 0,
          product_id: product.id,
          created_at: product.created_at || undefined,
          updated_at: product.updated_at || undefined,
          deleted_at: null
        }]
      : []

  // Check for brownie product
  const isBrownie = product?.metadata?.BROWNIE === "TRUE"

  // Stepper state for brownies
  const [step, setStep] = useState<null | number>(null)
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  // --- Always render the page layout ---
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="content-container py-4">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <LocalizedClientLink
              href="/"
              className="text-gray-500 hover:text-pink-600 transition-colors duration-200 font-medium"
            >
              Home
            </LocalizedClientLink>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {product?.collection && (
              <>
                <LocalizedClientLink
                  href={`/collections/${product.collection?.handle ?? ''}`}
                  className="text-gray-500 hover:text-pink-600 transition-colors duration-200 font-medium"
                >
                  {product.collection?.title ?? ''}
                </LocalizedClientLink>
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
            <span className="text-gray-800 font-semibold">{product?.title ?? ''}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Layout */}
      {isBrownie && step === 1 ? (
        // Full-width Brownie Stepper for step 1
        <div className="w-full">
          <BrownieStepper
            step={step}
            setStep={setStep}
            selectedDesign={selectedDesign}
            setSelectedDesign={setSelectedDesign}
            message={message}
            setMessage={setMessage}
            product={product}
            region={region}
          />
        </div>
      ) : (
        <div className="bg-white">
          <div className="content-container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side - Main Content (stepper or gallery) */}
              <div className="lg:col-span-7">
                {isBrownie && step !== null ? (
                  <BrownieStepper
                    step={step}
                    setStep={setStep}
                    selectedDesign={selectedDesign}
                    setSelectedDesign={setSelectedDesign}
                    message={message}
                    setMessage={setMessage}
                    product={product}
                    region={region}
                  />
                ) : (
                  <>
                    <ImageGallery images={images ?? []} />
                    {isBrownie && (
                      <div className="mt-6">
                        <button
                          className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition font-bold text-lg"
                          onClick={() => setStep(1)}
                        >
                          Choose Design
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Right Side - Product Info */}
              {!(isBrownie && (step === 1 || step === 3)) && (
                <div className="lg:col-span-5">
                  <div className="sticky top-8">
                    {/* Product Title and Badges */}
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {product?.title ?? ''}
                      </h1>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          100% Vegetarian
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          All Natural
                        </span>
                      </div>
                      {/* Star Rating */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">(428 Reviews)</span>
                      </div>
                    </div>

                    {/* Product Info Component */}
                    <ProductInfo product={product} />

                    {/* Product Actions */}
                    <div className="mt-8">
                      <ProductActionsWrapper product={product} region={region} />
                    </div>

                    {/* Additional Features */}
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span>Add a free gift message in the cart</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Order by 4.00pm for next day delivery from £5.95</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Product Tabs */}
            {/* <div className="mt-16">
              <ProductTabs product={product} />
            </div> */}
            {/* Related Products */}
            {/* <div className="mt-16">
              <RelatedProducts product={product} countryCode={countryCode} />
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}

// Brownie Stepper as a subcomponent
function BrownieStepper({ step, setStep, selectedDesign, setSelectedDesign, message, setMessage, product, region }: {
  step: number,
  setStep: (n: number | null) => void,
  selectedDesign: string | null,
  setSelectedDesign: (s: string) => void,
  message: string,
  setMessage: (s: string) => void,
  product: any,
  region: any
}) {
  // If stepper is active, show the 3-step process
  if (step !== null) {
    return (
      <div className="content-container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <StepCircle active={step === 1} done={step > 1}>1</StepCircle>
              <StepLine done={step > 1} />
              <StepCircle active={step === 2} done={step > 2}>2</StepCircle>
              <StepLine done={step > 2} />
              <StepCircle active={step === 3}>3</StepCircle>
            </div>
          </div>
          {/* Step 1: Choose Design */}
          {step === 1 && (
            <div className="content-container mx-auto w-full px-0">
              <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">Choose Your Brownie Design</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
                {BROWNIE_ARTWORKS.map((img, idx) => (
                  <button
                    key={img}
                    className={`rounded-xl overflow-hidden border-4 transition cursor-pointer shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-500 bg-white w-full ${selectedDesign === img ? "border-pink-600 ring-4 ring-pink-500" : "border-gray-100"}`}
                    onClick={() => setSelectedDesign(img)}
                  >
                    <img
                      src={`/brownies-artwork/${img}`}
                      alt={`Brownie Design ${idx + 1}`}
                      className="object-contain w-full h-auto"
                    />
                  </button>
                ))}
              </div>
              <div className="flex justify-between w-full">
                <button
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition text-lg"
                  onClick={() => setStep(null)}
                >
                  Back to Product
                </button>
                <button
                  className="px-8 py-4 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition font-bold text-lg disabled:opacity-50"
                  disabled={!selectedDesign}
                  onClick={() => setStep(2)}
                >
                  Next: Write Message
                </button>
              </div>
            </div>
          )}
          {/* Step 2: Write Message */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Write Your Gift Message</h2>
              <textarea
                className="w-full border-2 border-gray-200 rounded-lg p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
                rows={4}
                maxLength={200}
                placeholder="Type your message here (max 200 characters)"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition font-bold text-lg disabled:opacity-50"
                  disabled={message.trim().length === 0}
                  onClick={() => setStep(3)}
                >
                  Next: Place Order
                </button>
              </div>
            </div>
          )}
          {/* Step 3: Place Order */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Review & Place Your Order</h2>
              <div className="mb-6 flex flex-col items-center">
                <span className="font-semibold mb-2">Selected Design:</span>
                {selectedDesign && (
                  <img
                    src={`/brownies-artwork/${selectedDesign}`}
                    alt="Selected Brownie Design"
                    className="w-40 h-40 object-cover rounded-lg border-2 border-pink-500 mb-4"
                  />
                )}
                <span className="font-semibold mb-2">Gift Message:</span>
                <div className="bg-gray-100 rounded-lg p-4 w-full text-center text-lg mb-4">
                  {message}
                </div>
              </div>
              {/* Show product info and actions only here */}
              <ProductInfo product={product} />
              <div className="mt-6">
                <ProductActionsWrapper product={product} region={region} />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition font-bold text-lg"
                  onClick={() => {/* Place order logic here, or scroll to cart/checkout */}}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

// Stepper UI components
function StepCircle({ active, done, children }: { active?: boolean; done?: boolean; children: React.ReactNode }) {
  return (
    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold text-lg transition ${done ? "bg-pink-600 border-pink-600 text-white" : active ? "border-pink-600 text-pink-600 bg-white" : "border-gray-300 text-gray-400 bg-white"}`}>{children}</div>
  )
}
function StepLine({ done }: { done?: boolean }) {
  return <div className={`w-10 h-1 ${done ? "bg-pink-600" : "bg-gray-300"} rounded-full`} />
}

export default ProductTemplate
