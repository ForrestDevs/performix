import { Metadata } from 'next'
import { Testimonials } from './components/testimonials'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Performix Hockey: Why We're Different",
  description:
    'Watch this video to see exactly what to expect and how our D1 players and experts will help you take your game to the next level.',
  keywords: 'hockey performance review, D1 coaches, player development',
  openGraph: {
    title: "Performix Hockey: Why We're Different",
    description:
      'Watch this video to see exactly what to expect and how our D1 players and experts will help you take your game to the next level.',
    url: 'https://performix.ca/why-were-different',
    siteName: 'Performix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover the Performix Hockey System',
    description:
      'Get an inside look at how the Performix Hockey System works so you can get the most from your session.',
  },
}

export default function DiscoverTheSystem() {
  return (
    <main className="bg-background min-h-screen flex flex-col gap-20 items-center justify-start pt-16">
      <section className="relative overflow-hidden">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                  Book Your Free Session
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Choose a time below. This is the first step whether you&apos;re doing a 1-on-1 call
                with a D1 player or a video analysis session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4">
        <div className="max-w-6xl mx-auto min-w-[320px] h-[800px]">
          <iframe
            src="https://calendly.com/mateodixon/d1-mentorship-call"
            width="100%"
            height="700px"
            data-resize="true"
            title="Book Your Free Session"
            className="w-full min-w-[320px]"
          />
        </div>
      </section>

      <section className="w-full px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk'] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
              Why We&apos;re Different
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mx-auto text-center">
            <strong>Before your session:</strong> Watch this video to see exactly what to expect and
            how our D1 players and experts will help you take your game to the next level.
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-8 font-semibold">
            Step 2: Watch Now
          </p>
          <div className="w-full bg-black/90 rounded-xl overflow-hidden aspect-video flex items-center justify-center shadow-lg border border-border">
            <iframe
              src="https://www.loom.com/embed/26e601500ac14c6895ea0705fb85c486"
              allowFullScreen
              title="How the D1 Review Works"
              className="w-full h-full min-h-[300px]"
            ></iframe>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            <span className="font-medium text-foreground">Pro tip:</span> Watch with your player and
            jot down questions for the coaches!
          </p>
        </div>
      </section>

      <Testimonials />

      <section className="w-full flex items-center justify-center px-4 pb-20">
        <div className="mx-auto text-center max-w-xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-foreground">
            Curious what&apos;s possible with our full development system?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">
            Discover the proven methods, training, and tools that help hockey players reach the next
            level — on and off the ice.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-lg font-bold shadow-xl bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] text-white hover:from-[#0E7490] hover:to-[#7C3AED] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/60 focus:ring-offset-2"
          >
            Explore the full system
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>
    </main>
  )
}
