import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Logo from "@modules/common/components/logo"
import PromoBanner from "@modules/layout/components/promo-banner"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const categories = await listCategories()

  // Find the Free From category and its children
  const freeFromCategory = categories?.find(cat => cat.handle === 'free-from')
  const freeFromSubcategories = categories?.filter(cat => cat.parent_category_id === freeFromCategory?.id)

  // Find the Our Products category
  const ourProductsCategory = categories?.find(cat => 
    cat.handle === 'our-products' || 
    cat.handle === 'birthday-cakes' || 
    cat.handle === 'baby-sponges' || 
    cat.handle === 'brownies-by-post'
  )

  // Find the By Occasion category and its children
  const byOccasionCategory = categories?.find(cat => cat.handle === 'by-occasion')
  const byOccasionSubcategories = categories?.filter(cat => cat.parent_category_id === byOccasionCategory?.id)

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Get in Touch", href: "/contact" }
  ]

  return (
    <div className="relative z-50">
      {/* Promotional Banner */}
      <PromoBanner />
      
      {/* Main Header */}
      <header className="relative bg-white/95 backdrop-blur-md">
        {/* Top Row: Logo, Search, Account/Cart */}
        <div className="content-container pt-3">
          <div className="flex items-center justify-between w-full h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center mt-2">
                <Logo className="hover:scale-105 transition-transform duration-200" />
              </div>
            </div>

            {/* Search Bar - Center */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Account, Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Desktop Account Link */}
              <div className="hidden xl:block">
                <LocalizedClientLink
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="hidden xl:block font-medium">ACCOUNT</span>
                </LocalizedClientLink>
              </div>

              {/* Cart Button */}
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-200"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
                    </svg>
                    <span className="hidden xl:block font-medium">0</span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>

              {/* Mobile Menu Button */}
              <div className="flex items-center xl:hidden">
                <SideMenu regions={regions} categories={categories} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Main Navigation */}
        <div className="hidden xl:block">
          <div className="content-container">
            <nav className="flex items-center justify-center space-x-8 py-4">
              {/* Home Link */}
              <LocalizedClientLink
                href="/"
                className="text-gray-700 hover:text-pink-500 font-medium text-base font-nav tracking-normal transition-all duration-200 relative group/nav py-2"
                data-testid="nav-home-link"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover/nav:w-full"></span>
              </LocalizedClientLink>

              {/* Free From Dropdown */}
              <div className="relative group/freefrom">
                <button className="text-gray-700 hover:text-pink-500 font-medium text-base font-nav tracking-normal transition-all duration-200 relative py-2 flex items-center gap-1">
                  Free From
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover/freefrom:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover/freefrom:w-full"></span>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover/freefrom:opacity-100 group-hover/freefrom:visible transition-all duration-300 transform translate-y-2 group-hover/freefrom:translate-y-0 z-50">
                  <div className="p-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Free From</h4>
                      <div className="space-y-1">
                        {freeFromSubcategories?.map((subcategory) => (
                          <LocalizedClientLink key={subcategory.id} href={`/categories/${subcategory.handle}`}>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group/item">
                              <span className="text-gray-700 group-hover/item:text-pink-500 font-medium">{subcategory.name}</span>
                              <svg className="w-4 h-4 text-gray-400 group-hover/item:text-pink-500 opacity-0 group-hover/item:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </LocalizedClientLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Products Dropdown */}
              <div className="relative group/products">
                <button className="text-gray-700 hover:text-pink-500 font-medium text-base font-nav tracking-normal transition-all duration-200 relative py-2 flex items-center gap-1">
                  Our Products
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover/products:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover/products:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover/products:opacity-100 group-hover/products:visible transition-all duration-300 transform translate-y-2 group-hover/products:translate-y-0 z-50">
                  <div className="p-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
                      <div className="space-y-1">
                        {categories?.filter(category => 
                          category.handle === 'birthday-cakes' ||
                          category.handle === 'baby-sponges' ||
                          category.handle === 'brownies-by-post' ||
                          category.handle === 'vegan-cakes' ||
                          category.handle === 'gluten-free' ||
                          category.handle === 'dairy-free'
                        ).map((category) => {
                          // Define icons for different categories
                          const getCategoryIcon = (categoryName: string) => {
                            const name = categoryName.toLowerCase();
                            if (name.includes('baby') || name.includes('sponge')) {
                              return "🧁";
                            } else if (name.includes('brownie') || name.includes('chocolate')) {
                              return "🍫";
                            } else if (name.includes('birthday') || name.includes('celebration')) {
                              return "🎂";
                            } else if (name.includes('vegan') || name.includes('free')) {
                              return "🌱";
                            } else if (name.includes('letterbox') || name.includes('gift')) {
                              return "📦";
                            } else if (name.includes('cupcake') || name.includes('muffin')) {
                              return "🧁";
                            } else {
                              // Default cake icon
                              return "🍰";
                            }
                          };

                          return (
                            <LocalizedClientLink key={category.id} href={`/categories/${category.handle}`}>
                              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group/item">
                                <div className="flex items-center gap-3">
                                  <span className="text-base group-hover/item:scale-110 transition-transform duration-300">
                                    {getCategoryIcon(category.name)}
                                  </span>
                                  <span className="text-gray-700 group-hover/item:text-pink-500 font-medium">{category.name}</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400 group-hover/item:text-pink-500 opacity-0 group-hover/item:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </LocalizedClientLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* By Occasion Dropdown */}
              <div className="relative group/occasion">
                <button className="text-gray-700 hover:text-pink-500 font-medium text-base font-nav tracking-normal transition-all duration-200 relative py-2 flex items-center gap-1">
                  By Occasion
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover/occasion:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover/occasion:w-full"></span>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover/occasion:opacity-100 group-hover/occasion:visible transition-all duration-300 transform translate-y-2 group-hover/occasion:translate-y-0 z-50">
                  <div className="p-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Occasions</h4>
                      <div className="space-y-1">
                        {byOccasionSubcategories?.map((subcategory) => (
                          <LocalizedClientLink key={subcategory.id} href={`/categories/${subcategory.handle}`}>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group/item">
                              <span className="text-gray-700 group-hover/item:text-pink-500 font-medium">{subcategory.name}</span>
                              <svg className="w-4 h-4 text-gray-400 group-hover/item:text-pink-500 opacity-0 group-hover/item:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </LocalizedClientLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Navigation Items */}
              {navigationItems.slice(1).map((item) => (
                <LocalizedClientLink
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-600 font-medium text-base font-nav tracking-normal transition-all duration-200 relative group/nav py-2"
                  data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}-link`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-300 group-hover/nav:w-full"></span>
                </LocalizedClientLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden">
          <div className="content-container py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
