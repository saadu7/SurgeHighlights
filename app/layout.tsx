import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Surge Highlights',
  description: 'Created by Saad Usmani',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
