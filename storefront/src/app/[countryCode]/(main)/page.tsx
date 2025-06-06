import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getRegion, listRegions } from "@lib/data/regions"
import { getProductsByCategoryHandle } from "@lib/data/products"
import { cache } from "react"
import Hero from "@modules/home/components/hero"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TrendingTreats from "@modules/home/components/trending-treats"
import VeganBestSellers from "@modules/home/components/vegan-best-sellers"
import BirthdayCakeCollection from "@modules/home/components/birthday-cake-collection"
import CacheRefreshButton from "@modules/common/components/cache-refresh-button"
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
  const birthdayCakes = await getProductsByCategoryHandle("birthday-cakes", countryCode, 4)
  const veganProducts = await getProductsByCategoryHandle("vegan-cakes", countryCode, 4)
  const trendingProducts = await getProductsByCategoryHandle("trending-treats", countryCode, 8)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Trending Treats Section */}
      <TrendingTreats products={trendingProducts} />

      {/* Featured Collections */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="content-container">
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">SHOP BY CATEGORY</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">Discover our delicious range of premium cakes and treats</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 md:gap-8">
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
            ].map((category, index) => (
              <LocalizedClientLink key={index} href={category.href}>
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-3xl">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} bg-opacity-40 sm:bg-opacity-50 md:bg-opacity-60 flex flex-col justify-center items-center text-white`}>
                    <h3 className="text-3xl sm:text-2xl md:text-3xl font-bold mb-2 text-center drop-shadow-lg">{category.title}</h3>
                    <p className="text-lg sm:text-base md:text-lg text-center drop-shadow-md">{category.subtitle}</p>
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      {/* Birthday Cake Collection */}
      <BirthdayCakeCollection products={birthdayCakes} />

      {/* Vegan Best Sellers */}
      <VeganBestSellers products={veganProducts} />

      {/* Cache Refresh Button (Development Only) */}
      <CacheRefreshButton />
    </div>
  )
}
