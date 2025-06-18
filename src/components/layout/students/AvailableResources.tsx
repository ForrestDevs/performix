'use client'

import { motion } from 'motion/react'
import { Video, BookOpen, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ResourceData {
  id: number
  title: string
  type: string
  isNew: boolean
  duration: string
}

interface AvailableResourcesProps {
  resources: ResourceData[]
}

export default function AvailableResources({ resources }: AvailableResourcesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">New Resources</h2>
        <Link href="/resources">
          <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center">
            Browse All
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                {resource.type === 'Video Course' || resource.type === 'Video Analysis' ? (
                  <Video className="w-4 h-4 text-cyan-600" />
                ) : (
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  {resource.isNew && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{resource.type}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {resource.duration}
                  </div>
                </div>
              </div>
            </div>
            <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">View</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
