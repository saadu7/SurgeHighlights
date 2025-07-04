"use client"

import type React from "react"
import { useState } from "react"
import { Input, Textarea, Button, Label } from "./ui-pieces"

interface CreateHighlightDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; location: string; description: string }) => void
  isLoading?: boolean
}

export default function CreateHighlightDialog({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateHighlightDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.location && formData.description && !isLoading) {
      onSubmit(formData)
      setFormData({ title: "", location: "", description: "" })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ title: "", location: "", description: "" })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create a highlight</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Highlight name <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Enter highlight name"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isLoading}
              rows={3}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={handleClose} disabled={isLoading} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.title || !formData.location || !formData.description}
              className="btn-primary flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
