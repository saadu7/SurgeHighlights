// Import necessary dependencies
import { type Highlight } from "@/types/highlight"                   // TypeScript types
import { format } from "date-fns"                                    // Date formatting utility

/**
 * Props interface for the HighlightCard component
 * Defines the data structure needed to render a single card
 */
interface HighlightCardProps {
  highlight: Highlight;                                              // The highlight data to display
  imageUrl?: string;                                                // Optional image URL (may be loading)
  isLoading?: boolean;                                              // Whether the image is currently loading
}

/**
 * HighlightCard component
 * Renders a single highlight as a card with image, title, location, and description
 * Uses hover effects and responsive design
 */
export default function HighlightCard({ 
  highlight,                                                         // The highlight data
  imageUrl,                                                          // Image URL (optional)
  isLoading = false                                                  // Loading state (defaults to false)
}: HighlightCardProps) {
  return (
    <div className="card group">
      {/* 
        Card container with:
        - card: Base card styling (white background, rounded corners, shadow)
        - group: Enables group hover effects for child elements
      */}
      
      {/* Image Section - 16:9 aspect ratio container */}
      <div className="aspect-video relative overflow-hidden">
        {/* 
          Image container with:
          - aspect-video: 16:9 aspect ratio
          - relative: For positioning child elements
          - overflow-hidden: Hides image overflow
        */}
        
        {isLoading ? (
          // Loading state - shows animated placeholder
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : imageUrl ? (
          // Image loaded - display the actual image
          <img
            src={imageUrl}                                           // Image source URL
            alt={highlight.title}                                    // Accessibility alt text
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            /* 
              Image styling:
              - w-full h-full: Fill the container
              - object-cover: Maintain aspect ratio, crop if needed
              - group-hover:scale-105: Scale up 5% on card hover
              - transition-transform duration-300: Smooth 300ms transition
            */
          />
        ) : (
          // No image available - show placeholder
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400">No image</div>
          </div>
        )}
      </div>

      {/* Content Section - text and metadata */}
      <div className="p-6">
        {/* 
          Content container with:
          - p-6: 1.5rem padding on all sides
        */}
        
        {/* Title - limited to 2 lines with ellipsis */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {highlight.title}
          {/* 
            Title styling:
            - text-xl: Large text size
            - font-semibold: Semi-bold font weight
            - text-gray-900: Dark gray color
            - mb-2: Bottom margin
            - line-clamp-2: Limit to 2 lines with ellipsis
          */}
        </h3>
        
        {/* Location with emoji icon */}
        <p className="text-sm text-gray-500 mb-3">
          📍 {highlight.location}
          {/* 
            Location styling:
            - text-sm: Small text size
            - text-gray-500: Medium gray color
            - mb-3: Bottom margin
          */}
        </p>
        
        {/* Description - limited to 3 lines with ellipsis */}
        <p className="text-gray-700 line-clamp-3 mb-4">
          {highlight.description}
          {/* 
            Description styling:
            - text-gray-700: Dark gray color
            - line-clamp-3: Limit to 3 lines with ellipsis
            - mb-4: Bottom margin
          */}
        </p>
        
        {/* Date - formatted using date-fns */}
        <div className="text-xs text-gray-400">
          {format(new Date(highlight.createdAt), "MMM d, yyyy")}
          {/* 
            Date styling:
            - text-xs: Extra small text size
            - text-gray-400: Light gray color
            - format: Converts ISO string to readable format (e.g., "Jan 15, 2024")
          */}
        </div>
      </div>
    </div>
  )
}