"use client"

import { useState, useEffect } from "react"
import { getHighlights, type Highlight } from "@/src/lib/api"
import HighlightsSection from "@/components/HighlightsSection"

export default function Home() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getHighlights()
        setHighlights(data)
      } catch (err) {
        setError("Failed to load highlights")
        console.error("Error loading highlights:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHighlights()
  }, [])

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

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <HighlightsSection highlights={highlights} onHighlightsChange={setHighlights} />
    </main>
  )
}
