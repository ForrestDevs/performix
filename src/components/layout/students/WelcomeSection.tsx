'use client'

import { motion } from 'motion/react'

interface StudentData {
  firstName: string
  lastName: string
  user: {
    name: string
    image?: string | null
  }
}

interface WelcomeSectionProps {
  student: StudentData
}

export default function WelcomeSection({ student }: WelcomeSectionProps) {
  const firstName = student.firstName || student.user.name.split(' ')[0] || 'Student'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-2">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-cyan-100 text-lg">Ready to take your game to the next level?</p>
          </div>
          <div className="hidden md:block">
            {student.user.image ? (
              <img
                src={student.user.image}
                alt={student.user.name}
                className="w-20 h-20 rounded-full border-4 border-white/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
