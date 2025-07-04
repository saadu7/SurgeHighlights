const API_BASE_URL = "https://surgetakehome.vercel.app"

export interface Highlight {
  id: string
  title: string // Changed from 'name' to 'title' based on API docs
  location: string
  description: string
  createdAt: string
}

export interface CreateHighlightData {
  title: string // Changed from 'name' to 'title'
  location: string
  description: string
}


const USER_ID = "cipher" 

export async function getHighlights(): Promise<Highlight[]> {
  // Return mock data if UUID is not set

  try {
    // Using the correct endpoint from API docs
    const response = await fetch(`${API_BASE_URL}/api/getreviews/${USER_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      return getMockHighlights()
    }

    const data = await response.json()

    // Transform the data to match our interface and add IDs if missing
    const highlights = Array.isArray(data) ? data : data.reviews || []
    return highlights.map((item: any, index: number) => ({
      id: item.id || `review-${index}`,
      title: item.title || item.name || "Untitled",
      location: item.location || "Unknown Location",
      description: item.description || "No description",
      createdAt: item.createdAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.error("Error fetching highlights:", error)
    return getMockHighlights()
  }
}

export async function createHighlight(highlightData: CreateHighlightData): Promise<Highlight | null> {

  try {
    // Using the correct endpoint from API docs
    const response = await fetch(`${API_BASE_URL}/api/postreview/${USER_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highlightData),
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      return createMockHighlight(highlightData)
    }

    const data = await response.json()

    // Transform response to match our interface
    const newHighlight = {
      id: data.id || Date.now().toString(),
      title: data.title || highlightData.title,
      location: data.location || highlightData.location,
      description: data.description || highlightData.description,
      createdAt: data.createdAt || new Date().toISOString(),
    }

    return newHighlight
  } catch (error) {
    console.error("Error creating highlight:", error)
    return createMockHighlight(highlightData)
  }
}

export async function fetchImageForHighlight(query: string): Promise<string> {
  // Use a predefined set of reliable images to avoid CORS and API issues
  const imageMap: Record<string, string> = {
    // Nature/Outdoor keywords
    mountain: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop&auto=format",
    grouse: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop&auto=format",
    hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=225&fit=crop&auto=format",
    trail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=225&fit=crop&auto=format",

    // Beach/Water keywords
    beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop&auto=format",
    bay: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop&auto=format",
    english: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop&auto=format",
    water: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=225&fit=crop&auto=format",
    ocean: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=225&fit=crop&auto=format",

    // City/Urban keywords
    city: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop&auto=format",
    vancouver: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=225&fit=crop&auto=format",
    granville: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=225&fit=crop&auto=format",
    island: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=225&fit=crop&auto=format",
    market: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=225&fit=crop&auto=format",

    // Activities
    food: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=225&fit=crop&auto=format",
    restaurant: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=225&fit=crop&auto=format",
    sunset: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=225&fit=crop&auto=format",

    // Default fallbacks
    park: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop&auto=format",
    nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop&auto=format",
  }

  // Try to find a matching image based on keywords in the query
  const lowerQuery = query.toLowerCase()

  for (const [keyword, imageUrl] of Object.entries(imageMap)) {
    if (lowerQuery.includes(keyword)) {
      return imageUrl
    }
  }

  // If no specific match found, return a default nature image
  return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop&auto=format"
}

// Mock data functions for development
function getMockHighlights(): Highlight[] {
  return [
    {
      id: "1",
      title: "Grouse Grind", // Changed from 'name' to 'title'
      location: "Vancouver, BC",
      description: "This trail is a hidden gem! The views at the summit were absolutely breathtaking.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "English Bay Beach", // Changed from 'name' to 'title'
      location: "Vancouver, BC",
      description:
        "Summer evenings at English Bay watching the sunset became my pandemic escape. The warm sand between my toes and the sound of waves...",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      title: "Granville Island", // Changed from 'name' to 'title'
      location: "Vancouver, BC",
      description: "Meeting the passionate vendors who shared their stories made me feel truly connected.",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ]
}

function createMockHighlight(data: CreateHighlightData): Highlight {
  return {
    id: Date.now().toString(),
    title: data.title, // Changed from 'name' to 'title'
    location: data.location,
    description: data.description,
    createdAt: new Date().toISOString(),
  }
}
