"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import type { CreateHighlightRequest } from "@/types/highlight"
import { Input, Textarea, Button, Label } from "./ui-pieces"

interface CreateHighlightModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (highlight: CreateHighlightRequest) => Promise<void>
}

export default function CreateHighlightModal({ isOpen, onClose, onSubmit }: CreateHighlightModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.location.trim() || !formData.description.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      const response = await fetch('https://surgetakehome.vercel.app/api/postreview/cipher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.name, // or formData.title if you use that key
          location: formData.location,
          description: formData.description,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post review');
      }
      setFormData({ name: "", location: "", description: "" })
      onClose()
    } catch (error) {
      console.error("Error submitting highlight:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", location: "", description: "" })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Create a highlight</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Highlight name <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter highlight name"
              required
            />
          </div>

          <div>
            <Label>Location <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <Label>Description <span className="text-red-500">*</span></Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Confirm"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
