import type React from "react"
import type { Metadata } from "next"
import { Inter, Abril_Fatface, Passion_One } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const abrilFatface = Abril_Fatface({
  weight: "400",
  variable: "--font-abril-fatface",
  subsets: ["latin"],
});

export const passionOne = Passion_One({
  weight: "400",
  variable: "--font-passion-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Highlights - Special Moments",
  description: "Share your favorite highlights, unforgettable memories, and the stories that make your life shine.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={abrilFatface.className}>{children}</body>
    </html>
  )
}
