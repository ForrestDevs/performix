import '@/lib/styles/globals.css'
import '@/lib/styles/scroll-animations.css'

import { Inter, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/footer'
import Header from '@/components/layout/header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Performix - From AAA to D1: Your Path Starts Here',
  description:
    'Connect with elite D1+ hockey mentors. Personalized guidance to elevate your game and secure your dream commitment.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.variable} font-sans antialiased`}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
