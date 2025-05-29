import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductsByCategoryHandle } from "@lib/data/products"
import { cache } from "react"
import Hero from "@modules/home/components/hero"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TrendingTreats from "@modules/home/components/trending-treats"
import { StoreRegion } from "@medusajs/types"

export const metadata: Metadata = {
  title: "Cake Box Gifts - Premium Cake Delivery",
  description:
    "Delicious door deliveries. Premium baby sponge cakes delivered fresh to your door. Perfect for birthdays, celebrations, and special moments.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  // Get real products from different categories
  const birthdayCakes = await getProductsByCategoryHandle("kids-birthdays", countryCode, 4)
  const veganProducts = await getProductsByCategoryHandle("vegan", countryCode, 4)
  const trendingProducts = await getProductsByCategoryHandle("trending-treats", countryCode, 8)

  return (
    <div className="min-h-screen bg-white">
      {/* Category Pills */}
      <section className="py-6">
        <div className="content-container">
          <div className="flex justify-center items-center gap-3 overflow-x-auto scrollbar-hide min-h-[60px] py-2">
            {[
              { name: "Baby Sponges", icon: "🧁", href: "/store?category=baby-sponges", color: "hover:border-pink-500 hover:bg-pink-50" },
              { name: "Brownies", icon: "🍫", href: "/store?category=brownies", color: "hover:border-amber-400 hover:bg-amber-50" },
              { name: "Kids Birthdays", icon: "🎂", href: "/store?category=kids-birthdays", color: "hover:border-blue-400 hover:bg-blue-50" },
              { name: "Vegan", icon: "🌱", href: "/store?category=vegan", color: "hover:border-green-400 hover:bg-green-50" },
              { name: "Letterbox Gifts", icon: "📦", href: "/store?category=letterbox", color: "hover:border-purple-400 hover:bg-purple-50" },
            ].map((category) => (
              <LocalizedClientLink key={category.name} href={category.href}>
                <div className={`group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-gray-200 font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md shadow-sm text-gray-700 hover:text-gray-900 ${category.color} backdrop-blur-sm`}>
                  <span className="text-base group-hover:scale-105 transition-transform duration-200">{category.icon}</span>
                  <span className="text-base font-bold tracking-wide">{category.name}</span>
                  <svg 
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <Hero />
      
      {/* Trust Badges Section */}
      <section className="py-12 bg-pink-50">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Free Delivery */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">
                FREE DELIVERY ON<br />WEEKDAYS
              </h3>
              <div className="w-2 h-2 bg-gray-800 rounded-full mb-4"></div>
              <p className="text-sm text-gray-700">
                When you spend over £40
              </p>
            </div>
            
            {/* Handmade in London */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">
                HANDMADE IN<br />LONDON
              </h3>
              <div className="w-2 h-2 bg-gray-800 rounded-full mb-4"></div>
              <p className="text-sm text-gray-700">
                Baking since 2015
              </p>
            </div>
            
            {/* Natural Ingredients */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-wide">
                NATURAL<br />INGREDIENTS
              </h3>
              <div className="w-2 h-2 bg-gray-800 rounded-full mb-4"></div>
              <p className="text-sm text-gray-700 max-w-xs">
                Only ever flavoured and coloured with fruits,<br />
                vegetable and spices.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Treats Section */}
      <TrendingTreats products={trendingProducts} />
      
      {/* Featured Collections */}
      <section className="py-12 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">SHOP BY CATEGORY</h2>
            <p className="text-lg text-gray-600">Discover our delicious range of premium cakes and treats</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Baby Sponges",
                subtitle: "Soft & Delicious",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop",
                gradient: "from-pink-500 to-pink-600",
                href: "/store?category=baby-sponges"
              },
              {
                title: "Brownies",
                subtitle: "Rich & Fudgy",
                image: "/brownies-banner.jpg",
                gradient: "from-amber-600 to-amber-800",
                href: "/store?category=brownies"
              },
              {
                title: "Free From",
                subtitle: "Allergen Friendly",
                image: "/freefrom.jpg",
                gradient: "from-green-400 to-green-600",
                href: "/store?category=vegan"
              }
            ].map((item, index) => (
              <LocalizedClientLink key={index} href={item.href}>
                <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
                          {item.title}
                        </h3>
                        <div className="inline-block px-6 py-2 border-2 border-white text-white font-bold text-sm tracking-wider rounded-sm hover:bg-white hover:text-black transition-colors duration-200 drop-shadow-md">
                          SHOP NOW
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="content-container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              🍰 Celebrate Big, Even Last Minute – with Cake Box Gifts
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Why stress over baking when you can send a cake in seconds? At Cake Box Gifts, we make it easy to turn 
              any moment into a celebration. Whether it's a forgotten birthday, a surprise thank-you, or a just-because 
              treat, our next-day cake delivery service ensures your gift arrives fresh, fast, and full of flavour.
            </p>
            <p className="text-xl font-semibold text-pink-500 mb-8">
              Whether you're planning ahead or sending a last-minute surprise, Cake Box Gifts is your trusted cake 
              delivery partner—delivering happiness, one slice at a time.
            </p>
            <LocalizedClientLink href="/store">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                <span>Start Shopping</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      {/* Birthday Cake Collection */}
      <section className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">🎂</span>
              BIRTHDAY CAKE COLLECTION
            </h3>
            <p className="text-lg text-blue-700">Perfect birthday cakes to make every celebration special!</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {birthdayCakes.length > 0 ? (
              birthdayCakes.map((cake) => {
                const price = cake.variants?.[0]?.calculated_price
                const priceString = price && price.calculated_amount 
                  ? `£${(price.calculated_amount / 100).toFixed(2)}` 
                  : 'Price on request'
                const imageUrl = cake.thumbnail || cake.images?.[0]?.url || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop"
                
                return (
                  <div key={cake.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={cake.title}
                        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Birthday
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                        {cake.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {cake.description || "Delicious birthday cake perfect for celebrations"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">
                          {priceString}
                        </span>
                        <LocalizedClientLink href={`/products/${cake.handle}`}>
                          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 hover:scale-[1.02]">
                            View Product
                          </button>
                        </LocalizedClientLink>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              // Fallback if no products found
              [
                {
                  name: "Classic Birthday Cake",
                  price: "£24.99",
                  image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop",
                  description: "Classic vanilla sponge with colorful buttercream",
                  href: "/categories/kids-birthdays"
                },
                {
                  name: "Chocolate Birthday Cake",
                  price: "£26.99",
                  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
                  description: "Rich chocolate cake with birthday decorations",
                  href: "/categories/kids-birthdays"
                },
                {
                  name: "Rainbow Birthday Cake",
                  price: "£28.99",
                  image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
                  description: "Colorful rainbow layers with vanilla frosting",
                  href: "/categories/kids-birthdays"
                },
                {
                  name: "Unicorn Birthday Cake",
                  price: "£32.99",
                  image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
                  description: "Magical unicorn themed birthday cake",
                  href: "/categories/kids-birthdays"
                }
              ].map((cake, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Birthday
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                      {cake.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {cake.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        {cake.price}
                      </span>
                      <LocalizedClientLink href={cake.href}>
                        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 hover:scale-[1.02]">
                          View Products
                        </button>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Vegan Best Sellers */}
      <section className="py-16 bg-white">
        <div className="content-container">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">🌱</span>
              VEGAN BEST SELLERS
            </h3>
            <p className="text-lg text-green-700">Our most popular plant-based treats that customers absolutely love!</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {veganProducts.length > 0 ? (
              veganProducts.map((product) => {
                const price = product.variants?.[0]?.calculated_price
                const priceString = price && price.calculated_amount 
                  ? `£${(price.calculated_amount / 100).toFixed(2)}` 
                  : 'Price on request'
                const imageUrl = product.thumbnail || product.images?.[0]?.url || "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop"
                
                return (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Vegan
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description || "Delicious vegan treat made with plant-based ingredients"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">
                          {priceString}
                        </span>
                        <LocalizedClientLink href={`/products/${product.handle}`}>
                          <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 hover:scale-[1.02]">
                            View Product
                          </button>
                        </LocalizedClientLink>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              // Fallback if no products found
              [
                {
                  name: "Vegan Carrot Cake",
                  price: "£15.99",
                  image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop",
                  description: "Moist carrot cake with vegan cream cheese frosting",
                  href: "/categories/vegan"
                },
                {
                  name: "Vegan Birthday Cake",
                  price: "£15.99",
                  image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop",
                  description: "Classic vanilla sponge with colorful buttercream",
                  href: "/categories/vegan"
                },
                {
                  name: "Vegan Berry Bliss",
                  price: "£15.99",
                  image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
                  description: "Mixed berry cake with fresh fruit topping",
                  href: "/categories/vegan"
                },
                {
                  name: "Vegan Millionaires",
                  price: "£15.99",
                  image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
                  description: "Rich chocolate cake with caramel layers",
                  href: "/categories/vegan"
                }
              ].map((cake, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Vegan
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                      {cake.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {cake.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-green-600">
                        {cake.price}
                      </span>
                      <LocalizedClientLink href={cake.href}>
                        <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 hover:scale-[1.02]">
                          View Products
                        </button>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <LocalizedClientLink href="/store?category=vegan">
              <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                View All Vegan Products
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-600">
        <div className="content-container text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🍰 Sweet Deals & Updates
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Be the first to know about new flavors, special offers, and seasonal treats!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-800"
              />
              <button className="px-8 py-3 bg-white text-pink-500 font-bold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02] shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
