'use client'

import { motion } from 'motion/react'
import { Play, ChevronRight, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Blueprint } from '@/payload-types'
import { BlueprintCard } from './blueprint-card'

interface EnrolledBlueprintsProps {
  blueprints: Blueprint[]
}

export default function EnrolledBlueprints({ blueprints }: EnrolledBlueprintsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">Your Blueprints</h2>
        <Link
          href="/resources"
          className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {blueprints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blueprints.map((blueprint, index) => (
            <BlueprintCard key={index} blueprint={blueprint} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Blueprints Enrolled</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Discover our structured blueprints designed to help you improve specific aspects of your
            game.
          </p>
          <Link href="/resources">
            <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center mx-auto">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Blueprints
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
