'use client'

import { motion } from 'motion/react'
import { Play, ChevronRight, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ProgramData {
  id: number
  title: string
  progress: number
  nextSession: string
  image?: string
}

interface StudentProgramsProps {
  programs: ProgramData[]
}

export default function StudentPrograms({ programs }: StudentProgramsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">Your Programs</h2>
        <Link href="/courses">
          <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </Link>
      </div>

      {programs.length > 0 ? (
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                  <Image
                  src={program.image || '/placeholder.svg'}
                  alt={program.title}
                  className="w-20 h-12 rounded-lg object-cover"
                  width={80}
                  height={48}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{program.nextSession}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${program.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{program.progress}%</span>
                  </div>
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center">
                  <Play className="w-4 h-4 mr-1" />
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Programs Enrolled</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Discover our structured programs designed to help you improve specific aspects of your
            game.
          </p>
          <Link href="/courses">
            <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center mx-auto">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Programs
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
