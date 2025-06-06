"use client"

import { Popover, Transition } from "@headlessui/react"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

// Enhanced interface to include categories
interface SideMenuProps {
  regions: HttpTypes.StoreRegion[] | null
  categories?: any[] // Categories from the database
}

const SideMenu = ({ regions, categories }: SideMenuProps) => {
  const toggleState = useToggleState()
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  // Find categories with their subcategories
  const freeFromCategory = categories?.find(cat => cat.handle === 'free-from')
  const freeFromSubcategories = categories?.filter(cat => cat.parent_category_id === freeFromCategory?.id)
  
  const byOccasionCategory = categories?.find(cat => cat.handle === 'by-occasion')
  const byOccasionSubcategories = categories?.filter(cat => cat.parent_category_id === byOccasionCategory?.id)

  const productCategories = categories?.filter(category => 
    category.handle === 'birthday-cakes' ||
    category.handle === 'baby-sponges' ||
    category.handle === 'brownies-by-post' ||
    category.handle === 'vegan-cakes' ||
    category.handle === 'gluten-free' ||
    category.handle === 'dairy-free'
  )

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className={clx(
                    "relative h-full flex items-center justify-center",
                    "w-12 h-12 rounded-xl", // Modern rounded button
                    "bg-gradient-to-br from-pink-50 to-orange-50",
                    "hover:from-pink-100 hover:to-orange-100",
                    "border border-pink-200/50 hover:border-pink-300/70",
                    "text-gray-700 hover:text-pink-600",
                    "transition-all duration-300 ease-out",
                    "focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:ring-offset-2",
                    "hover:scale-105 active:scale-95",
                    "shadow-sm hover:shadow-md",
                    open && "bg-gradient-to-br from-pink-100 to-orange-100 border-pink-400/70 text-pink-600"
                  )}
                  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={open}
                  aria-haspopup="menu"
                >
                                     {/* Animated Burger Icon */}
                   <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                     <span 
                       className={clx(
                         "burger-line",
                         open ? "rotate-45 translate-y-0" : "-translate-y-2"
                       )}
                     />
                     <span 
                       className={clx(
                         "burger-line",
                         open ? "opacity-0" : "opacity-100"
                       )}
                     />
                     <span 
                       className={clx(
                         "burger-line",
                         open ? "-rotate-45 translate-y-0" : "translate-y-2"
                       )}
                     />
                   </div>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Popover.Panel 
                  className="absolute top-0 left-0 w-full h-screen z-50 overflow-hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation menu"
                >
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={close} />
                  
                                     {/* Menu Panel */}
                    <div
                      data-testid="nav-menu-popup"
                      className="absolute right-0 top-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto mobile-menu-panel"
                    >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-end">
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        aria-label="Close navigation menu"
                        type="button"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Navigation Content */}
                    <nav className="p-4 space-y-2" role="navigation" aria-label="Main navigation">
                                             {/* Home */}
                       <LocalizedClientLink
                         href="/"
                         className="mobile-menu-item"
                         onClick={close}
                       >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                      </LocalizedClientLink>

                      {/* Our Products - Expandable */}
                      <div>
                                                 <button
                           onClick={() => toggleSection('products')}
                           className="mobile-menu-expandable"
                         >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Our Products
                          </div>
                          <ChevronRight className={clx(
                            "w-4 h-4 transition-transform duration-200",
                            expandedSections.products && "rotate-90"
                          )} />
                        </button>
                        
                        {expandedSections.products && (
                          <div className="ml-8 mt-2 space-y-1">
                            {productCategories?.map((category) => (
                                                             <LocalizedClientLink
                                 key={category.id}
                                 href={`/categories/${category.handle}`}
                                 className="mobile-submenu-item"
                                 onClick={close}
                               >
                                {category.name}
                              </LocalizedClientLink>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Free From - Expandable */}
                      <div>
                                                 <button
                           onClick={() => toggleSection('freefrom')}
                           className="mobile-menu-expandable"
                         >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Free From
                          </div>
                          <ChevronRight className={clx(
                            "w-4 h-4 transition-transform duration-200",
                            expandedSections.freefrom && "rotate-90"
                          )} />
                        </button>
                        
                        {expandedSections.freefrom && (
                          <div className="ml-8 mt-2 space-y-1">
                            {freeFromSubcategories?.map((subcategory) => (
                              <LocalizedClientLink
                                key={subcategory.id}
                                href={`/categories/${subcategory.handle}`}
                                className="mobile-submenu-item"
                                onClick={close}
                              >
                                {subcategory.name}
                              </LocalizedClientLink>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* By Occasion - Expandable */}
                      <div>
                                                 <button
                           onClick={() => toggleSection('occasion')}
                           className="mobile-menu-expandable"
                         >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            By Occasion
                          </div>
                          <ChevronRight className={clx(
                            "w-4 h-4 transition-transform duration-200",
                            expandedSections.occasion && "rotate-90"
                          )} />
                        </button>
                        
                        {expandedSections.occasion && (
                          <div className="ml-8 mt-2 space-y-1">
                            {byOccasionSubcategories?.map((subcategory) => (
                              <LocalizedClientLink
                                key={subcategory.id}
                                href={`/categories/${subcategory.handle}`}
                                className="mobile-submenu-item"
                                onClick={close}
                              >
                                {subcategory.name}
                              </LocalizedClientLink>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Other Links */}
                      <LocalizedClientLink
                        href="/about"
                        className="mobile-menu-item"
                        onClick={close}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About
                      </LocalizedClientLink>

                      <LocalizedClientLink
                        href="/blog"
                        className="mobile-menu-item"
                        onClick={close}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Blog
                      </LocalizedClientLink>

                      <LocalizedClientLink
                        href="/account"
                        className="mobile-menu-item"
                        onClick={close}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Account
                      </LocalizedClientLink>

                      <LocalizedClientLink
                        href="/cart"
                        className="mobile-menu-item"
                        onClick={close}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                        </svg>
                        Cart
                      </LocalizedClientLink>
                    </nav>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                      <div className="space-y-4">
                        {/* Country Select */}
                        <div
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                        >
                          {regions && (
                            <CountrySelect
                              toggleState={toggleState}
                              regions={regions}
                            />
                          )}
                          <ChevronDown className={clx(
                            "w-4 h-4 transition-transform duration-150 text-gray-600",
                            toggleState.state && "rotate-180"
                          )} />
                        </div>
                        
                        {/* Copyright */}
                        <Text className="text-xs text-gray-500 text-center">
                          © {currentYear} Cake Box Gifts. All rights reserved.
                        </Text>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
