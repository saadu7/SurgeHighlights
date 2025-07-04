export interface Highlight {
  id: string
  name: string
  location: string
  description: string
  createdAt: string
  imageUrl?: string
}

export interface CreateHighlightRequest {
  name: string
  location: string
  description: string
}
