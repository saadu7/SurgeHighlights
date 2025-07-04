const API_BASE_URL = "https://surgetakehome.vercel.app"

const USER_ID = "cipher"

type Highlight = {}

type CreateHighlightRequest = {}

export async function fetchHighlights(): Promise<Highlight[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/highlights?userId=${USER_ID}`)
    if (!response.ok) {
      throw new Error("Failed to fetch highlights")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching highlights:", error)
    return []
  }
}

export async function createHighlight(highlight: CreateHighlightRequest): Promise<Highlight | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/highlights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...highlight,
        userId: USER_ID,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create highlight")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating highlight:", error)
    return null
  }
}

export async function fetchImageFromUnsplash(query: string): Promise<string | null> {
  try {
    // Using Unsplash API as an example - you can replace with any image API
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: "Client-ID YOUR_UNSPLASH_ACCESS_KEY",
        },
      },
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.results[0]?.urls?.regular || null
  } catch (error) {
    console.error("Error fetching image:", error)
    return null
  }
}
