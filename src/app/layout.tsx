import type { Metadata } from "next";
import { Geist, Geist_Mono, Abril_Fatface, Passion_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  weight: "400",
  variable: "--font-abril-fatface",
  subsets: ["latin"],
});

const passionOne = Passion_One({
  weight: "400",
  variable: "--font-passion-one",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Highlights App",
  description: "Share the highlights of your life with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={abrilFatface.className}>                              {/* Body with Inter font */}
        {children}                                                    {/* Render page content */}
      </body>
    </html>
  );
}
