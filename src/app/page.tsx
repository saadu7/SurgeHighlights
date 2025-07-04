"use client"

import { abrilFatface, passionOne } from "./layout"
import { useState, useEffect } from "react"
import type { Highlight, CreateHighlightRequest } from "@/types/highlight"
import { fetchHighlights, createHighlight, fetchImageFromUnsplash } from "@/lib/api"
import HighlightsGrid from "@/components/HighlightsGrid"
import CreateHighlightModal from "@/components/CreateHighlightModal"
import FloatingActionButton from "@/components/FloatingActionButton"
import NameSignature from "@/components/NameSignature"

export default function Home() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadHighlights()
  }, [])

  const loadHighlights = async () => {
    setIsLoading(true)
    try {
      const data = await fetchHighlights()
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setHighlights(sortedData)
    } catch (error) {
      console.error("Error loading highlights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateHighlight = async (highlightData: CreateHighlightRequest) => {
    try {
      // Fetch image based on highlight name
      const imageUrl = await fetchImageFromUnsplash(highlightData.name)

      // Create the highlight
      const newHighlight = await createHighlight(highlightData)

      if (newHighlight) {
        // Add image URL if we got one
        if (imageUrl) {
          newHighlight.imageUrl = imageUrl
        }

        // Add to the beginning of the list (newest first)
        setHighlights((prev) => [newHighlight, ...prev])
      }
    } catch (error) {
      console.error("Error creating highlight:", error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <p className="text-red-500 text-sm font-medium mb-2 tracking-wide uppercase">HIGHLIGHTS</p>
          <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-4 font-abril-fatface">
            What are the special moments of your life?
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            We believe every moment counts! Share your favorite highlights, unforgettable memories, and the stories that
            make your life shine.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : highlights.length > 0 ? (
          <HighlightsGrid highlights={highlights} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No highlights yet. Create your first highlight to get started!</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      {/* Create Highlight Modal */}
      <CreateHighlightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateHighlight}
      />
      <NameSignature />
    </main>
  )
}
