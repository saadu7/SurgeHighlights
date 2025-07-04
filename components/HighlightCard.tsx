"use client"

import { useState } from "react"
import type { Highlight } from "@/src/lib/api"

interface HighlightCardProps {
  highlight: Highlight
  imageUrl?: string
  isLoadingImage?: boolean
}

export default function HighlightCard({ highlight, imageUrl, isLoadingImage = false }: HighlightCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const showPlaceholder = !imageUrl || imageError || isLoadingImage

  return (
    <article className="card">
      {/* Image */}
      <div className="aspect-video bg-gray-200 overflow-hidden relative">
        {!showPlaceholder ? (
          <>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={highlight.title}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              crossOrigin="anonymous"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {isLoadingImage ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
                <p className="text-xs text-gray-500">Loading image...</p>
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xs">Image</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
        <p className="text-gray-500 text-sm mb-3">{highlight.location}</p>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{highlight.description}</p>
      </div>
    </article>
  )
}
