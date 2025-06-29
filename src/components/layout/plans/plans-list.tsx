import { getPlans, isEnrolled } from '@/lib/data/plans'
import { Shield } from 'lucide-react'
import { PlanCard } from './plans-card'
import { getCurrentUser } from '@/lib/data/auth'

export async function PlansList() {
  const plans = await getPlans()
  const user = await getCurrentUser()

  return (
    <section className="py-16 -mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <PlanCard
                key={plan.id}
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
          Try any plan risk-free. If you&apos;re not completely satisfied within 30 days, we&apos;ll
          refund your payment.
        </p>
      </div>
    </section>
  )
}
