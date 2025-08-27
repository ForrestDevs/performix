import { getPlans, isEnrolled } from '@/lib/data/plans'
import { Shield } from 'lucide-react'
import { PlanCard } from './plans-card'
import { getCurrentUser } from '@/lib/data/auth'

export async function PlansList() {
  const plans = await getPlans()
  const user = await getCurrentUser()

  const specialPlans = plans.filter((plan) => plan.isSpecial)
  const regularPlans = plans.filter((plan) => !plan.isSpecial)

  return (
    <section className="py-16 -mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {regularPlans.map((plan, index) => {
            return (
              <PlanCard
                key={index}
                plan={plan}
                index={index}
                isAuthenticated={!!user}
                userId={user?.id}
              />
            )
          })}
        </div>
        <div className="grid grid-cols-1 max-w-7xl mx-auto py-16">
          {specialPlans.map((plan, index) => {
            return (
              <PlanCard
                key={index}
                plan={plan}
                index={index}
                isAuthenticated={!!user}
                userId={user?.id}
              />
            )
          })}
        </div>
      </div>
      <div
        id="guarantee"
        data-scroll-animate
        className="mt-12 text-center transition-all duration-1000 opacity-0 translate-y-8 animate-[fadeInUp_1s_ease-out_forwards]"
      >
        <div className="inline-flex items-center bg-green-50 text-green-700 px-6 py-3 rounded-full text-lg">
          <Shield className="h-6 w-6 mr-3" />
          <span className="font-semibold">30-Day Money-Back Guarantee</span>
        </div>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          You&apos;re not paying for just another plan
          <br />
          you&apos;re giving yourself the best shot to actually make it.
        </p>
        <div className="mt-16 max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0891B2]/10 to-[#8B5CF6]/10 p-2 hover:shadow-3xl transition-all duration-500">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src="https://www.youtube.com/embed/i5CWo6c0N1E"
              title="Performix - Elite Hockey Mentorship"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#0891B2] rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>
    </section>
  )
}
