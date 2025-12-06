import { Metadata } from 'next'
import { Testimonials } from './components/testimonials'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Discover the Performix Hockey System',
  description:
    'See the behind-the-scenes process of our free D1 Hockey Performance Review. Understand what to expect, how our coaches provide honest feedback, and why top families trust our developmental approach.',
  keywords: 'hockey performance review, D1 coaches, player development',
  openGraph: {
    title: 'Discover the Performix Hockey System',
    description:
      'Watch how our D1 review gives hockey families real, actionable feedback. Prepare now and get the most out of your free review by seeing what our process looks like.',
    url: 'https://performix.ca/discover-the-system',
    siteName: 'Performix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover the Performix Hockey System',
    description:
      'Get an inside look at how the Performix Hockey System works so you can get the most from your session.',
  },
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export default function DiscoverTheSystem() {
  return (
    <main className="bg-background min-h-screen flex flex-col items-center justify-start">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0891B2]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-1 gap-8 items-center">
            <div className="space-y-8 animate-fade-in-up text-center">
              <div className="inline-block">
                <span className="bg-green-50 text-green-700 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest animate-bounce-subtle">
                  You&apos;re in! <span className="inline ml-2">🎉</span>
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk'] mb-4">
                Discover How Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                  D1 Review
                </span>{' '}
                Works
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                <strong>Before your session:</strong> Watch this quick video to see exactly what to
                expect and how our D1 coaches will help you see your game with new eyes.
              </p>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                We&apos;ll be in touch soon with your next steps!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-8 font-semibold">
            Step 1: Watch Now
          </p>
          <div className="w-full bg-black/90 rounded-xl overflow-hidden aspect-video flex items-center justify-center shadow-lg border border-border">
            {/* Loom video */}
            <iframe
              src="https://www.loom.com/embed/26e601500ac14c6895ea0705fb85c486"
              allowFullScreen
              title="How the D1 Review Works"
              className="w-full h-full min-h-[300px]"
              frameBorder={0}
            ></iframe>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            <span className="font-medium text-foreground">Pro tip:</span> Watch with your player and
            jot down questions for the coaches!
          </p>
        </div>
      </section>

      <Testimonials />

      <section className="w-full px-4 py-14">
        <div className="mx-auto text-center">
          <p className="text-sm text-foreground/70 mb-2 font-semibold">
            Want to learn more about our full development system?
          </p>
          <Link
            href="/"
            className="inline-block mt-2 text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] hover:opacity-80 transition-opacity"
          >
            Visit our homepage &rarr;
          </Link>
        </div>
      </section>
    </main>
  )
}
