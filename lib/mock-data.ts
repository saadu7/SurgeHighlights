import { type Highlight } from "@/types/highlight"

// Simple mock data for development
export function getMockHighlights(): Highlight[] {
  return [
    {
      id: "1",
      title: "Grouse Grind",
      location: "Vancouver, BC",
      description: "This trail is a hidden gem! The views at the summit were absolutely breathtaking.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "English Bay Beach",
      location: "Vancouver, BC",
      description: "Summer evenings at English Bay watching the sunset became my pandemic escape.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      title: "Granville Island",
      location: "Vancouver, BC",
      description: "Meeting the passionate vendors who shared their stories made me feel truly connected.",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ]
}