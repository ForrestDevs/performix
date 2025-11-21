import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowDown, ArrowRight, Play, Quote } from 'lucide-react'
import { MessageReviews } from '@/components/layout/reviews/messages'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import {
  getParentReviews,
  getScreenshotReviews,
  getStandardReviews,
  getVideoReviews,
} from '@/lib/data/testimonials'
import { Testimonial, Video } from '@/payload-types'
import { VideoReview } from '@/components/layout/reviews/video-reviews'

export default async function ReviewsPage() {
  const videoReviews = await getVideoReviews()
  const screenshotReviews = await getScreenshotReviews()
  const parentReviews = await getParentReviews()

  return (
    <div>
      <section className="py-20 sm:py-32 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance text-foreground">
              The Performix <span className="text-primary">Effect</span>
            </h1>

            <blockquote className="text-xl md:text-2xl font-medium text-muted-foreground italic text-balance pt-2">
              This is what happens when you solve the right problems, the right way, at the right
              time.
            </blockquote>

            <Link
              href="game-plan"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl',
              )}
            >
              Start your game plan
            </Link>
          </div>
          <ArrowDown className="w-6 h-6 text-primary animate-bounce mx-auto mt-8" />
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">
              Hear It From <span className="text-primary">The Players</span>
            </h2>
            <p className="text-xl text-muted-foreground">Real transformations. Real voices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoReviews.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 flex flex-col shadow-lg rounded-xl h-full"
              >
                <div className="relative w-full  aspect-video flex items-center justify-center bg-gray-100 rounded-t-xl overflow-hidden">
                  <VideoReview video={testimonial.video as Video} />
                </div>

                <div className="flex-1 flex flex-col bg-white">
                  <div className="flex flex-row items-center justify-between px-6 pt-6 pb-0 min-h-[56px]">
                    <h3 className="font-bold text-xl text-foreground leading-tight mb-1 flex-shrink-0">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-primary mb-1 ml-4 text-right flex-grow truncate">
                      {testimonial.progression}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col justify-start">
                    {testimonial.message && (
                      <div className="px-6 pt-3 pb-6 flex flex-col justify-start flex-1">
                        <blockquote className="text-base md:text-lg text-muted-foreground italic border-l-4 border-primary/80 pl-4 bg-muted/50 rounded-lg py-3 h-full">
                          &quot;{testimonial.message}&quot;
                        </blockquote>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
            What <span className="text-primary">Parents</span> Are Saying
          </h2>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full justify-items-center">
              {parentReviews.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-border rounded-2xl p-8 flex flex-col justify-center shadow-md hover:shadow-xl transition-shadow text-center min-h-[360px] w-full max-w-sm mx-auto"
                >
                  <div className="flex items-start w-full mb-4 justify-center">
                    <Quote className="w-6 h-6 text-primary mr-2" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center w-full">
                    <p className="text-foreground font-semibold text-lg md:text-xl leading-relaxed mb-6 text-balance text-center">
                      &quot;<span className="font-extrabold">{testimonial.message}</span>&quot;
                    </p>
                  </div>
                  <div className="border-t border-border pt-5 w-full flex flex-col items-center mt-auto">
                    <p className="font-bold text-primary text-base">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.parentOf}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              What <span className="text-primary">Athletes Say</span>
            </h2>
          </div>
          <div>
            <MessageReviews messages={screenshotReviews} />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-card/30 flex flex-col items-center justify-center">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              The next story could be <span className="text-primary">yours</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              If you&apos;re serious about reaching your full potential, we&apos;ll help you get
              there. No guessing. No wasted time. Just progress.
            </p>
          </div>
        </div>
        <Link
          href="game-plan"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto',
          )}
        >
          Start your game plan
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  )
}
