'use client'

import { motion } from 'motion/react'
import { Play, ChevronRight, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Plan } from '@/payload-types'

interface CurrentPlanProps {
  enrolledPlan: Plan | undefined
}

export default function CurrentPlan({ enrolledPlan }: CurrentPlanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">Your Plan</h2>
        <Link
          href="/plans"
          className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {enrolledPlan ? (
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{enrolledPlan.title}</h3>
                <p className="text-sm text-gray-600">{enrolledPlan.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Active
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {enrolledPlan.includes && enrolledPlan.includes.length > 0 && (
              <div className="space-y-2">
                {enrolledPlan.includes.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mr-3" />
                    {feature.item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">Subscription Plan</div>
            <Link
              href="/student/settings"
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
            >
              Manage
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-cyan-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Plan</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Unlock your potential with our premium mentorship plans. Get personalized guidance,
            exclusive resources, and accelerate your hockey development.
          </p>
          <Link href="/plans">
            <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 flex items-center mx-auto shadow-sm">
              <Play className="w-4 h-4 mr-2" />
              Choose Your Plan
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
