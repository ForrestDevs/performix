import { TestimonialLoading } from '@/components/layout/home/testimonials/loading'
import { getParentReviews } from '@/lib/data/testimonials'
import { Quote } from 'lucide-react'
import { Suspense } from 'react'

export async function Testimonials() {
  const parentReviews = await getParentReviews()

  return (
    <section className="w-full px-4">
      <div className="mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
          What Parents and Players Are Saying
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mx-auto max-w-xl">
          Real stories from parents and players who used our system to unlock their development.
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="w-full bg-black/90 rounded-xl overflow-hidden aspect-video flex items-center justify-center shadow-lg border border-border">
          <iframe
            src="https://www.loom.com/embed/586f428ec155466789274030e10673a3"
            allowFullScreen
            title="How the D1 Review Works"
            className="w-full h-full min-h-[300px]"
          ></iframe>
        </div>
      </div>

      <Suspense fallback={<TestimonialLoading />}>
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full justify-items-center">
            {parentReviews.slice(0, 3).map((testimonial, index) => (
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
      </Suspense>
    </section>
  )
}
