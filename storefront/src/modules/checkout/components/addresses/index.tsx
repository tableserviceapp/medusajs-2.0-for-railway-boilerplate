"use client"

import { Heading, Text, useToggleState } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { useFormState } from "react-dom"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams?.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useFormState(setAddresses, null)

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="text-2xl font-bold text-gray-900 flex items-center gap-2"
        >
          Shipping Address
          {!isOpen && cart?.shipping_address && <CheckIcon />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction} noValidate>
          <div className="space-y-6">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-8">
                <Heading
                  level="h2"
                  className="text-xl font-bold text-gray-900 mb-6"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton 
              className="mt-8 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]" 
              data-testid="submit-address-button"
            >
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Contact
              </Text>
              <Text className="text-base text-gray-900" data-testid="shipping-address-summary">
                {cart?.email}
              </Text>
              <Text className="text-base text-gray-900 mt-1" data-testid="shipping-contact-summary">
                {cart?.shipping_address?.phone}
              </Text>
            </div>
            <div>
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Ship to
              </Text>
              <Text className="text-base text-gray-900" data-testid="shipping-address-summary">
                {cart?.shipping_address?.first_name}{" "}
                {cart?.shipping_address?.last_name}
              </Text>
              <Text className="text-base text-gray-900">
                {cart?.shipping_address?.address_1}
                {cart?.shipping_address?.address_2 && (
                  <span>, {cart?.shipping_address.address_2}</span>
                )}
              </Text>
              <Text className="text-base text-gray-900">
                {cart?.shipping_address?.city},{" "}
                {cart?.shipping_address?.province}{" "}
                {cart?.shipping_address?.postal_code}
              </Text>
              <Text className="text-base text-gray-900">
                {cart?.shipping_address?.country_code?.toUpperCase()}
              </Text>
            </div>
          </div>
          {cart?.billing_address && !sameAsBilling && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Bill to
              </Text>
              <Text className="text-base text-gray-900" data-testid="billing-address-summary">
                {cart?.billing_address?.first_name}{" "}
                {cart?.billing_address?.last_name}
              </Text>
              <Text className="text-base text-gray-900">
                {cart?.billing_address?.address_1}
                {cart?.billing_address?.address_2 && (
                  <span>, {cart?.billing_address.address_2}</span>
                )}
              </Text>
              <Text className="text-base text-gray-900">
                {cart?.billing_address?.city},{" "}
                {cart?.billing_address?.province}{" "}
                {cart?.billing_address?.postal_code}
              </Text>
              <Text className="text-base text-gray-900">
                {cart?.billing_address?.country_code?.toUpperCase()}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Addresses
