// Mark this as a client component since we'll use React hooks
"use client"

// Import React hooks and our API functions
import { useState, useEffect } from "react"                           // React hooks for state and effects
// import { getHighlights, type Highlight } from "../../lib/api"
import { type Highlight } from "../types/highlight"
import { getMockHighlights } from "../../lib/mock-data"          // Our API function and types
import HighlightsGrid from "../../components/highlights-grid"        // Main content component

/**
 * Home page component - the main entry point of our app
 * This component manages the global state and renders the main content
 */
export default function Home() {
  // State management for our highlights data
  const [highlights, setHighlights] = useState<Highlight[]>([])       // Array of highlights
  const [isLoading, setIsLoading] = useState(true)                    // Loading state
  const [highlightImages, setHighlightImages] = useState<Record<string, string>>({})
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())
//   const [error, setError] = useState<string | null>(null)             // Error state

//   /**
//    * Effect hook to fetch highlights when component mounts
//    * This runs once when the component is first rendered
//    */
//   useEffect(() => {
//     // Define the async function to fetch highlights
//     const fetchHighlights = async () => {
//       try {
//         setIsLoading(true)                                            // Start loading
//         setError(null)                                                // Clear any previous errors
//         const data = await getHighlights()                            // Fetch data from API
//         setHighlights(data)                                           // Update state with fetched data
//       } catch (err) {
//         setError("Failed to load highlights")                        // Set error message
//         console.error("Error loading highlights:", err)               // Log error for debugging
//       } finally {
//         setIsLoading(false)                                           // End loading regardless of success/failure
//       }
//     }

//     // Call the fetch function
//     fetchHighlights()
//   }, [])                                                              // Empty dependency array = run once on mount

//   /**
//    * Loading state UI
//    * Shows a spinner and loading message while data is being fetched
//    */
//   if (isLoading) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           {/* Animated spinner using Tailwind classes */}
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading highlights...</p>
//         </div>
//       </main>
//     )
//   }

//   /**
//    * Error state UI
//    * Shows error message and retry button if data fetching failed
//    */
//   if (error) {
//     return (
//       <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 mb-4">{error}</p>
//           {/* Retry button that reloads the page */}
//           <button onClick={() => window.location.reload()} className="btn-primary">
//             Try Again
//           </button>
//         </div>
//       </main>
//     )
//   }

//   /**
//    * Main content UI
//    * Renders the highlights section when data is successfully loaded
//    */
//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Pass highlights data and update function to the section component */}
//       <HighlightsSection highlights={highlights} onHighlightsChange={setHighlights} />
//     </main>
//   )
// }

useEffect(() => {
  // Simulate API call with mock data
  const loadHighlights = async () => {
    setIsLoading(true)
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = getMockHighlights()
    setHighlights(data)
    setIsLoading(false)
  }

  loadHighlights()
}, [])

// Simple image loading effect
// useEffect(() => {
//   if (highlights.length > 0) {
//     // For now, just set placeholder images
//     const newImages: Record<string, string> = {}
//     highlights.forEach(highlight => {
//       newImages[highlight.id] = `https://picsum.photos/400/225?random=${highlight.id}`
//     })
//     setHighlightImages(newImages)
//   }
// }, [highlights])

if (isLoading) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading highlights...</p>
      </div>
    </main>
  )
}

return (
  <main className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <header className="mb-12">
        <p className="text-red-500 text-sm font-medium mb-2 tracking-wide uppercase">HIGHLIGHTS</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          What are the special moments of your life?
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that
          make your life shine.
        </p>
      </header>

      {/* Highlights Grid */}
      {highlights.length > 0 ? (
        <HighlightsGrid highlights={highlights} highlightImages={highlightImages} loadingImages={loadingImages} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No highlights yet.</p>
          <p className="text-gray-400">Highlights will appear here!</p>
        </div>
      )}
    </div>
  </main>
)
}