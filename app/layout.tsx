import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Pharaoh Prints Apparel - Wholesale Egyptian-Themed Clothing",
    template: "%s | Pharaoh Prints Apparel",
  },
  description:
    "Exclusive Egyptian-themed apparel for bazaars and shops. Wholesale pricing with bulk discounts. Premium quality prints featuring Tutankhamun, Nefertiti, and ancient Egyptian art.",
  keywords: ["Egyptian clothing", "wholesale apparel", "Pharaoh prints", "bazaar clothing", "souvenir shirts", "ancient egypt fashion"],
  authors: [{ name: "Pharaoh Prints" }],
  creator: "Pharaoh Prints",
  publisher: "Pharaoh Prints",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Pharaoh Prints Apparel - Wholesale Egyptian-Themed Clothing",
    description: "Exclusive Egyptian-themed apparel for bazaars and shops. Wholesale pricing with bulk discounts.",
    url: "https://pharaohprints.com",
    siteName: "Pharaoh Prints Apparel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharaoh Prints Apparel",
    description: "Exclusive Egyptian-themed apparel for bazaars and shops.",
    creator: "@pharaohprints",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster position="bottom-right" richColors />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
