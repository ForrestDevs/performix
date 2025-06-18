'use client'

import { motion } from 'motion/react'
import { Video, BookOpen, Trophy, TrendingUp } from 'lucide-react'

interface StatsData {
  sessionsCompleted: number
  coursesInProgress: number
  goalsAchieved: number
  weeklyProgress: number
}

interface QuickStatsProps {
  stats: StatsData
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Sessions Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.sessionsCompleted}</p>
          </div>
          <div className="p-3 bg-cyan-100 rounded-lg">
            <Video className="w-6 h-6 text-cyan-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Courses in Progress</p>
            <p className="text-2xl font-bold text-gray-900">{stats.coursesInProgress}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Goals Achieved</p>
            <p className="text-2xl font-bold text-gray-900">{stats.goalsAchieved}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Weekly Progress</p>
            <p className="text-2xl font-bold text-gray-900">{stats.weeklyProgress}%</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
