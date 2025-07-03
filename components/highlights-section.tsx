"use client"

import { useState, useEffect } from "react"
import { type Highlight, createHighlight, fetchImageForHighlight } from "@/lib/api"
import HighlightsGrid from "./highlights-grid"
import CreateHighlightDialog from "./CreateHighlightDialog"
import FloatingActionButton from "./FloatingActionButton"

interface HighlightsSectionProps {
  highlights: Highlight[]
  onHighlightsChange: (highlights: Highlight[]) => void
}

export default function HighlightsSection({ highlights, onHighlightsChange }: HighlightsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [highlightImages, setHighlightImages] = useState<Record<string, string>>({})
  const [isCreating, setIsCreating] = useState(false)
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())

  // Fetch images for highlights
  useEffect(() => {
    const fetchImages = async () => {
      const newHighlights = highlights.filter((h) => !highlightImages[h.id] && !loadingImages.has(h.id))

      if (newHighlights.length === 0) return

      // Mark highlights as loading
      setLoadingImages((prev) => {
        const newSet = new Set(prev)
        newHighlights.forEach((h) => newSet.add(h.id))
        return newSet
      })

      // Fetch images with delay to avoid overwhelming the service
      for (const highlight of newHighlights) {
        try {
          const imageUrl = await fetchImageForHighlight(highlight.title)

          setHighlightImages((prev) => ({
            ...prev,
            [highlight.id]: imageUrl,
          }))
        } catch (error) {
          console.error(`Error fetching image for ${highlight.title}:`, error)
          setHighlightImages((prev) => ({
            ...prev,
            [highlight.id]: "/placeholder.svg?height=225&width=400",
          }))
        } finally {
          setLoadingImages((prev) => {
            const newSet = new Set(prev)
            newSet.delete(highlight.id)
            return newSet
          })
        }

        // Add small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    if (highlights.length > 0) {
      fetchImages()
    }
  }, [highlights, highlightImages, loadingImages])

  const handleCreateHighlight = async (data: { title: string; location: string; description: string }) => {
    setIsCreating(true)
    try {
      const newHighlight = await createHighlight(data)

      if (newHighlight) {
        // Add new highlight to the beginning of the list
        const updatedHighlights = [newHighlight, ...highlights]
        onHighlightsChange(updatedHighlights)
        setIsDialogOpen(false)

        // Fetch image for the new highlight in the background
        fetchImageForHighlight(newHighlight.title)
          .then((imageUrl) => {
            setHighlightImages((prev) => ({ ...prev, [newHighlight.id]: imageUrl }))
          })
          .catch((error) => {
            console.error("Error fetching image for new highlight:", error)
            setHighlightImages((prev) => ({
              ...prev,
              [newHighlight.id]: "/placeholder.svg?height=225&width=400",
            }))
          })
      }
    } catch (error) {
      console.error("Error creating highlight:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
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
          <p className="text-gray-400">Click the + button to create your first highlight!</p>
        </div>
      )}

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsDialogOpen(true)} />

      {/* Create Highlight Dialog */}
      <CreateHighlightDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateHighlight}
        isLoading={isCreating}
      />
    </div>
  )
}
