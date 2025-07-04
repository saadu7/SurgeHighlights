// Import our types and card component
import HighlightCard from "./highlight-card"                          // Individual card component
import { type Highlight } from "@/types/highlight"                   // TypeScript types

/**
//  * Props interface for the HighlightsGrid component
//  * This defines what data the component needs to function
//  */
// interface HighlightsGridProps {
//   highlights: Highlight[];                                           // Array of highlight data
//   highlightImages: Record<string, string>;                          // Map of highlight ID to image URL
//   loadingImages: Set<string>;                                       // Set of highlight IDs currently loading images
// }

// /**
//  * HighlightsGrid component
//  * Renders a responsive grid of highlight cards
//  * Uses CSS Grid for responsive layout that adapts to screen size
//  */
// export default function HighlightsGrid({ 
//   highlights,                                                        // Array of highlights to display
//   highlightImages,                                                   // Image URLs for each highlight
//   loadingImages                                                      // Loading states for images
// }: HighlightsGridProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {/* 
//         Grid layout configuration:
//         - grid-cols-1: Single column on mobile
//         - md:grid-cols-2: Two columns on medium screens (tablet)
//         - lg:grid-cols-3: Three columns on large screens (desktop)
//         - gap-6: 1.5rem gap between grid items
//       */}
      
//       {/* Map through highlights array and render a card for each */}
//       {highlights.map((highlight) => (
//         <HighlightCard
//           key={highlight.id}                                         // Unique key for React rendering
//           highlight={highlight}                                      // Pass the highlight data
//           imageUrl={highlightImages[highlight.id]}                   // Pass the image URL for this highlight
//           isLoading={loadingImages.has(highlight.id)}               // Pass loading state for this highlight
//         />
//       ))}
//     </div>
//   )
// }


interface HighlightsGridProps {
  highlights: Highlight[]
  highlightImages: Record<string, string>
  loadingImages: Set<string>
}

export default function HighlightsGrid({ highlights, highlightImages, loadingImages }: HighlightsGridProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {highlights.map((highlight) => (
        <HighlightCard
          key={highlight.id}
          highlight={highlight}
          imageUrl={highlightImages[highlight.id]}
          isLoadingImage={loadingImages.has(highlight.id)}
        />
      ))}
    </section>
  )
}