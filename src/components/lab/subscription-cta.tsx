import { Card, CardContent } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/data/auth'
import { isEnrolledInAnyPlan } from '@/lib/data/plans'
import { cn } from '@/lib/utilities/ui'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

export async function SubscriptionCTA() {
  const user = await getCurrentUser()
  const hasPlan = await isEnrolledInAnyPlan(user?.id)

  if (hasPlan) {
    return null
  }

  return (
    <section className="px-4 container mx-auto">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlock Full Access to The Lab</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Get unlimited access to all modules, volumes, and lessons. Join thousands of athletes
            who are already transforming their performance with our proven training methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plans"
              className={cn(buttonVariants({ size: 'lg' }), 'bg-blue-600 hover:bg-blue-700')}
            >
              View Subscription Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'bg-white hover:bg-gray-50',
              )}
            >
              Schedule a Call
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export function SubscriptionCTALoadingSkeleton() {
  return (
    <section className="px-4 container mx-auto">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96 mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
