import type { Highlight } from "@/src/lib/api"
import HighlightCard from "./HighlightCard"

interface HighlightsGridProps {
  highlights: Highlight[]
  highlightImages: Record<string, string>
  loadingImages: Set<string>
}

export default function HighlightsGrid({ highlights, highlightImages, loadingImages }: HighlightsGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {highlights.map((highlight) => (
        <HighlightCard
          key={highlight.id}
          highlight={highlight}
          imageUrl={highlightImages[highlight.id]}
          isLoadingImage={loadingImages.has(highlight.id)}
        />
      ))}
    </section>
  )
}
