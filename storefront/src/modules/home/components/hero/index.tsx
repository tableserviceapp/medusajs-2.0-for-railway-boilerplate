import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="content-container py-6 lg:py-8">
      <div className="group relative h-[600px] lg:h-[650px] w-full overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700">
        
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 100%), url('/mainbanner.avif')`,
            backgroundPosition: 'center left'
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse hidden lg:block" />
        <div className="absolute bottom-16 right-16 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse delay-1000 hidden lg:block" />
        <div className="absolute top-1/3 left-8 w-16 h-16 bg-gradient-to-br from-white/20 to-pink-100/20 rounded-full blur-lg animate-pulse delay-500 hidden lg:block" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
          
          {/* Main Content - Bottom Left */}
          <div className="max-w-2xl">
          {/* Main Headline */}
          <Heading
            level="h1"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 lg:mb-6 text-white leading-tight"
              style={{ 
                textShadow: '3px 3px 0px rgba(0,0,0,0.8), 6px 6px 12px rgba(0,0,0,0.6), 0px 0px 20px rgba(0,0,0,0.4)' 
              }}
            >
              <span className="block mb-2">
                Delicious Door
              </span>
              <span className="block">
                Deliveries
              </span>
          </Heading>
            
            {/* Elegant Divider */}
            <div className="w-24 h-1 bg-white rounded-full mb-6 lg:mb-8 shadow-lg" />
          
          {/* Subheadline */}
            <p 
              className="text-lg lg:text-xl text-white font-semibold mb-8 lg:mb-10 leading-relaxed max-w-lg"
              style={{ 
                textShadow: '2px 2px 0px rgba(0,0,0,0.8), 4px 4px 8px rgba(0,0,0,0.6)' 
              }}
          >
              Premium handcrafted cakes & treats delivered fresh to your door. 
              <span className="block mt-2 text-pink-100 font-bold">Perfect for every celebration.</span>
            </p>

          {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
            <LocalizedClientLink href="/store">
                <Button className="group/btn text-lg px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0">
                  <span className="flex items-center gap-3">
                    Shop Now
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
              </Button>
            </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* Floating Action Hint */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg animate-bounce">
            <span className="text-sm font-medium text-gray-700">Scroll to explore</span>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
