import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="content-container py-4 lg:py-6">
      <div className="group relative h-[580px] w-full overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl lg:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer">
        {/* White outline inside the banner */}
        <div className="absolute inset-4 border-4 border-white rounded-xl lg:rounded-2xl pointer-events-none z-20 group-hover:border-white/90 transition-colors duration-300"></div>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-3xl transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('/mainbanneropt.webp')`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-black/20 rounded-2xl lg:rounded-3xl group-hover:from-black/30 group-hover:via-black/15 group-hover:to-black/10 transition-all duration-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-6 sm:px-8 lg:px-16">
          <div className="max-w-3xl">
            {/* Main Headline */}
            <Heading
              level="h1"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 lg:mb-6 text-white leading-tight drop-shadow-2xl transform group-hover:translate-y-[-4px] transition-transform duration-500"
            >
              <span className="inline-block group-hover:scale-105 transition-transform duration-300">
                Delicious Door
              </span>
              <br />
              <span className="text-white drop-shadow-lg inline-block group-hover:scale-105 transition-transform duration-300 delay-75">
                Deliveries
              </span>
            </Heading>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/95 font-medium mb-6 lg:mb-8 leading-relaxed drop-shadow-lg max-w-2xl transform group-hover:translate-y-[-2px] transition-transform duration-500 delay-100">
              Premium baby sponge cakes & treats delivered fresh to your door. Perfect for birthdays, celebrations, and sweet moments.
            </p>

            {/* Single CTA Button */}
            <div className="mb-8 transform group-hover:translate-y-[-2px] transition-transform duration-500 delay-150">
              <LocalizedClientLink href="/store">
                <Button className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-pink-500 hover:text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white hover:border-pink-500 group-hover:animate-pulse">
                  <span className="flex items-center gap-2">
                    Shop Now
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Button>
              </LocalizedClientLink>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium transform group-hover:translate-y-[-2px] transition-transform duration-500 delay-200">
              <div className="flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <span className="text-green-400 group-hover:scale-110 transition-transform duration-300">✓</span>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2 group-hover:text-white transition-colors duration-300 delay-75">
                <span className="text-green-400 group-hover:scale-110 transition-transform duration-300">✓</span>
                <span>Free Delivery £39.50+</span>
              </div>
              <div className="flex items-center gap-2 group-hover:text-white transition-colors duration-300 delay-150">
                <span className="text-green-400 group-hover:scale-110 transition-transform duration-300">✓</span>
                <span>Next Day Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce group-hover:animate-pulse">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm group-hover:border-white/70 transition-colors duration-300">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse group-hover:bg-white transition-colors duration-300"></div>
          </div>
        </div>

        {/* Floating Elements for Extra Polish */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-500 hidden lg:block"></div>
        <div className="absolute bottom-32 right-32 w-2 h-2 bg-white/30 rounded-full animate-pulse group-hover:scale-200 transition-transform duration-700 delay-200 hidden lg:block"></div>
        <div className="absolute top-40 left-20 w-3 h-3 bg-white/15 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-600 delay-100 hidden lg:block"></div>
      </div>
    </div>
  )
}

export default Hero
