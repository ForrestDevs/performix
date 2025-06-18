'use client'

import { motion } from 'motion/react'
import { Clock, CheckCircle, Video, BookOpen, Target } from 'lucide-react'

interface ActivityData {
  id: number
  action: string
  time: string
  mentor?: string | null
}

interface RecentActivityProps {
  activities: ActivityData[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (action: string) => {
    if (action.toLowerCase().includes('video') || action.toLowerCase().includes('session')) {
      return <Video className="w-4 h-4 text-cyan-600" />
    }
    if (action.toLowerCase().includes('goal')) {
      return <Target className="w-4 h-4 text-green-600" />
    }
    if (action.toLowerCase().includes('completed') || action.toLowerCase().includes('profile')) {
      return <CheckCircle className="w-4 h-4 text-green-600" />
    }
    return <BookOpen className="w-4 h-4 text-purple-600" />
  }

  const getActivityBgColor = (action: string) => {
    if (action.toLowerCase().includes('video') || action.toLowerCase().includes('session')) {
      return 'bg-cyan-100'
    }
    if (action.toLowerCase().includes('goal')) {
      return 'bg-green-100'
    }
    if (action.toLowerCase().includes('completed') || action.toLowerCase().includes('profile')) {
      return 'bg-green-100'
    }
    return 'bg-purple-100'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk'] mb-6">
        Recent Activity
      </h2>

      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getActivityBgColor(activity.action)}`}>
                {getActivityIcon(activity.action)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <span>{activity.time}</span>
                  {activity.mentor && (
                    <>
                      <span>•</span>
                      <span>with {activity.mentor}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">No Recent Activity</h3>
          <p className="text-gray-600 text-sm">
            Your activity will appear here as you engage with the platform.
          </p>
        </div>
      )}
    </motion.div>
  )
}
