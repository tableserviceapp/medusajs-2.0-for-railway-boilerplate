import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="content-container py-6 lg:py-8">
      <div className="group relative w-full overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700">
        {/* Responsive Image Container with Optimized Aspect Ratio for Desktop */}
        <div className="relative w-full" style={{ paddingBottom: '42.85%' }}> {/* 21:9 Aspect Ratio for fathers-banner.png */}
          <picture>
            <source
              srcSet="/mobile-banner-fathers-day-min.png"
              media="(max-width: 640px)"
            />
            <img
              src="/fathers-banner.png"
              alt="Father's Day Special"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
              style={{ width: '100%', height: '100%' }}
            />
          </picture>
        </div>
      </div>
    </div>
  )
}

export default Hero
