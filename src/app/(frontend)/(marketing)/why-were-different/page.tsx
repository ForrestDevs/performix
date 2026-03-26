import { Metadata } from 'next'
import { Testimonials } from './components/testimonials'

const subtitle =
  "We'll text you shortly to help set up the best time for your child's off-season development plan. Want to book now instead? You can do that below."
const whyWereDifferentLoomUrl =
  'https://www.loom.com/embed/b0745407715e4dd8b2abe06bb5e5dce5?hideEmbedTopBar=true'

export const metadata: Metadata = {
  title: "You're All Set | Performix",
  description: subtitle,
  keywords: 'hockey performance review, D1 coaches, player development',
  openGraph: {
    title: "You're All Set | Performix",
    description: subtitle,
    url: 'https://performix.ca/why-were-different',
    siteName: 'Performix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "You're All Set | Performix",
    description: subtitle,
  },
}

export default function DiscoverTheSystem() {
  return (
    <main className="bg-background min-h-screen">
      <section className="relative overflow-hidden pt-16 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0891B2]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up text-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk']">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                  You&apos;re all set
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">{subtitle}</p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden border border-border bg-white shadow-xl">
              <iframe
                src="https://calendly.com/mateodixon/d1-mentorship-call"
                width="100%"
                height="760"
                data-resize="true"
                title="Book a time with Performix"
                className="w-full min-w-[320px]"
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="w-full px-4">
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
          <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk']">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
              Why Performix Is Different
            </span>
          </h2>
          <div className="w-full bg-black/90 rounded-xl overflow-hidden aspect-video flex items-center justify-center shadow-lg border border-border">
            <iframe
              src={whyWereDifferentLoomUrl}
              allowFullScreen
              title="Why Performix Is Different"
              className="w-full h-full min-h-[300px]"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
