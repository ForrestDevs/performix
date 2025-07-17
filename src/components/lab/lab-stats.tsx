import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { getLabStats } from '@/lib/data/lab'
import { BookOpen, Play, Clock, Video } from 'lucide-react'

// Stats component that fetches lab statistics
export async function LabStatsSection() {
  const stats = await getLabStats()

  const statsDisplay = [
    { label: 'Total Modules', value: stats.totalModules.toString(), icon: BookOpen },
    { label: 'Expert Lessons', value: `${stats.totalLessons}+`, icon: Play },
    { label: 'Hours of Content', value: `${stats.estimatedHours}+`, icon: Clock },
    { label: 'Video Library', value: `${stats.totalVideos}+`, icon: Video },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
      {statsDisplay.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2">
            <stat.icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export function StatsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="text-center">
          <Skeleton className="w-12 h-12 rounded-lg mx-auto mb-2" />
          <Skeleton className="h-8 w-16 mx-auto mb-1" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  )
}
