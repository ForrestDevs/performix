'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Plan } from '@/payload-types'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useEffect, useState } from 'react'
import { isEnrolled } from '@/lib/data/plans'

interface PlanCardProps {
  plan: Pick<Plan, 'id' | 'title' | 'description' | 'includes' | 'bestFor' | 'price' | 'mostPopular'>
  index: number
  isAuthenticated: boolean
  userId: number | undefined
}

const colorMap = {
  0: {
    color: 'bg-gradient-to-br from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
  },
  1: {
    color: 'bg-white',
    textColor: 'text-indigo-600',
  },
  2: {
    color: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    textColor: 'text-emerald-600',
  },
  3: {
    color: 'bg-gradient-to-br from-amber-50 to-amber-100',
    textColor: 'text-amber-600',
  },
} as const

const getColorVariant = (index: number) => colorMap[(index % 4) as keyof typeof colorMap]

export function PlanCard({ plan, index, isAuthenticated, userId }: PlanCardProps) {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)
  const { color, textColor } = getColorVariant(index)

  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    if (!userId) return
    const checkEnrollment = async () => {

      const isEnrolledInPlan = await isEnrolled(userId, plan.id)
    
      setEnrolled(isEnrolledInPlan)
    }
    checkEnrollment()
  }, [])

  const buttonText = isAuthenticated ? (enrolled ? 'Enrolled' : 'Subscribe') : 'Get Started'
  const buttonLink = isAuthenticated
    ? enrolled
      ? '/student'
      : `/checkout?t=plan&pid=${plan.id}`
    : '/get-started'

  return (
    <div
      key={plan.id}
      id={`plan-${plan.id}`}
      data-scroll-animate
      className={`transition-all duration-1000 ${
        isVisible(`plan-${plan.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card
        className={`border-2 h-full flex flex-col ${
          plan.mostPopular
            ? 'border-[#0891B2] shadow-lg shadow-[#0891B2]/10'
            : 'border-gray-200 hover:border-gray-300'
        } ${color} transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
      >
        {plan.mostPopular && (
          <div className="absolute top-0 right-0">
            <div className="bg-[#0891B2] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
          </div>
        )}
        <CardHeader className="text-center pt-6 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-6 space-y-2">
          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold leading-tight tracking-wider uppercase ${textColor}`}>
            {plan.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base lg:text-base mt-2">
            {plan.description}
          </p>
          <div className="my-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tighter">
              ${plan.price}
            </span>
            <span className="text-gray-600 text-sm sm:text-base ml-1 block sm:inline">
              USD/month
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow px-4 sm:px-6 pb-6">
          <div className="space-y-4">
            <ul className="space-y-3">
              {plan.includes?.map((feature, i) => (
                <li key={i} className="flex items-start group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-green-200 transition-colors duration-200">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {feature.item}
                  </span>
                </li>
              ))}
            </ul>
            {plan.bestFor && (
              <div className="mt-4">
                <div className="p-4">
                  <p className="text-gray-600 text-md leading-relaxed">{plan.bestFor}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4 pb-8">
          <Link
            href={buttonLink}
            className={cn(
              buttonVariants(),
              'w-full text-white',
              plan.mostPopular
                ? 'bg-[#0891B2] hover:bg-[#0E7490]'
                : 'bg-blue-500 hover:bg-blue-600',
            )}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
