"use client"

import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && pathname && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="h-full">
          <div className="relative flex items-center justify-center w-10 h-10 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-gray-200 rounded-2xl shadow-2xl w-[420px] text-ui-fg-base overflow-hidden"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-pink-50 to-orange-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
                </svg>
                Shopping Cart
              </h3>
              {totalItems > 0 && (
                <span className="bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-6 py-4 grid grid-cols-1 gap-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[80px_1fr] gap-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.variant?.product?.handle}`}
                          className="w-20 h-20 rounded-lg overflow-hidden bg-white shadow-sm"
                        >
                          <Thumbnail
                            thumbnail={item.variant?.product?.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                            className="w-full h-full object-cover"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-800 truncate">
                                  <LocalizedClientLink
                                    href={`/products/${item.variant?.product?.handle}`}
                                    data-testid="product-link"
                                    className="hover:text-pink-500 transition-colors duration-200"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  className="text-xs text-gray-600 mt-1"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <LineItemPrice item={item} style="tight" />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200 self-start"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-6 flex flex-col gap-y-4 text-small-regular bg-gradient-to-r from-gray-50 to-pink-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">
                      Subtotal{" "}
                      <span className="text-xs text-gray-500">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-xl font-bold text-pink-500"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      View Cart & Checkout
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-pink-100 text-pink-500 text-small-regular flex items-center justify-center w-12 h-12 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Your cart is empty.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                        Explore products
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
