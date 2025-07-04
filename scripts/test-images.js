// Test script to verify image fetching works
const testQueries = [
  "Grouse Grind",
  "English Bay Beach",
  "Granville Island",
  "Vancouver",
  "Mountain hiking",
  "Beach sunset",
]

async function testImageFetching() {
  console.log("Testing image fetching...")

  for (const query of testQueries) {
    try {
      // Test Picsum approach
      const seed = query.replace(/\s+/g, "").toLowerCase()
      const imageUrl = `https://picsum.photos/seed/${seed}/400/225`

      console.log(`Query: "${query}" -> URL: ${imageUrl}`)

      // Test if image loads
      const response = await fetch(imageUrl, { method: "HEAD" })
      console.log(`Status: ${response.status} ${response.ok ? "✅" : "❌"}`)
    } catch (error) {
      console.error(`Error testing "${query}":`, error.message)
    }
  }
}

testImageFetching()
