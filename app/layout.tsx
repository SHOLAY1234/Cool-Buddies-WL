import './globals.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'

const inter = Space_Mono({ subsets: ['latin'], weight: '400' })

const baseUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.PORT || 3000}` :
  'https://' + process.env.VERCEL_URL as string;

export const metadata: Metadata = {
  title: 'Residium Finance | OG & WL Checker',
  description: 'OG & WL Address Checker',
  viewport: { width: "device-width", initialScale: 1 },
  metadataBase: new URL(baseUrl),
  keywords: "NFT, SOL, Residium Finance, art, mint, free",
  creator: 'Dayal',
  publisher: 'Residium Finance',
  generator: 'Next.js',
  applicationName: 'Residium Finance',
  authors: [
    {
      name: 'Residium Finance',
      url: 'https://x.com/ResidiumFinance'
    }
  ],
  openGraph: {
    title: 'OG & WL Wallet Address Checker',
    description: 'Residium Finance | OG & WL Checker',
    siteName: 'Residium Finance',
  },
  twitter: {
    title: 'OG & WL Wallet Address Checker',
    description: 'Residium Finance | OG & WL Checker',
    card: 'summary',
    creator: '@ResidiumFinance',
  },

}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
