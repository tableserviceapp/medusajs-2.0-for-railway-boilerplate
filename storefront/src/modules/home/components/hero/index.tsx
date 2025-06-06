import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="content-container py-6 lg:py-8">
      <LocalizedClientLink href="/categories/fathers-day">
        <div className="group relative w-full overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 cursor-pointer">
          {/* Responsive Image Container with Different Aspect Ratios for Mobile vs Desktop */}
          <div className="relative w-full">
            {/* Mobile aspect ratio - 1:1 square for fathers-day-banner.png (800x800) */}
            <div className="block sm:hidden" style={{ paddingBottom: '100%' }}>
              <picture>
                <img
                  src="/fathers-day-banner.png"
                  alt="Father's Day Special Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
            </div>
            
            {/* Desktop aspect ratio - 21:9 for fathers-banner.png */}
            <div className="hidden sm:block" style={{ paddingBottom: '42.85%' }}>
              <picture>
                <img
                  src="/fathers-banner.png"
                  alt="Father's Day Special Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}

export default Hero
