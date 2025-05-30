"use client"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No image available
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
        {images[selectedImage]?.url && (
          <Image
            src={images[selectedImage].url}
            priority={true}
            className="absolute inset-0"
            alt={`Product image ${selectedImage + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden ${
                selectedImage === index ? "ring-2 ring-pink-500" : ""
              }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
