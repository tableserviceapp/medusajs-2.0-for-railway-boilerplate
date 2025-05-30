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
      <section className="py-12 bg-white">
        <div className="content-container">
          <div className="mb-12">
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
          </div>
        </div>
      </section>

      {/* Birthday Cake Collection */}
      <BirthdayCakeCollection products={birthdayCakes} />

      {/* Vegan Best Sellers */}
      <VeganBestSellers products={veganProducts} />
    </div>
  )
}
