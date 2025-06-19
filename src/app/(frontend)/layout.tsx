import { Inter, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Footer from '../../components/layout/footer'
import '@/lib/styles/globals.css'
import '@/lib/styles/scroll-animations.css'
import { BetterAuthProvider } from '@/lib/auth/context'
import { getContextProps } from '@/lib/auth/context/get-context-props'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Performix - Your Path To Excellence Starts Here',
  description:
    'Connect with elite D1+ hockey mentors. Personalized guidance to elevate your game and smash your goals.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.variable} font-sans antialiased`}>
        <NuqsAdapter>
          <BetterAuthProvider {...getContextProps()}>
            <main>{children}</main>
            <Footer />
            <Toaster />
          </BetterAuthProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
