import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="content-container py-6 lg:py-8">
      <div className="group relative h-[600px] lg:h-[650px] w-full overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: `url('/fathers-banner.png')`,
            backgroundPosition: 'center center'
          }}
        />
      </div>
    </div>
  )
}

export default Hero
