'use client'

import { motion } from 'motion/react'
import { Calendar, MessageCircle, ChevronRight, UserPlus, Phone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface MentorData {
  name: string
  avatar?: string
  team: string
  position: string
  nextSession: string
}

interface CurrentMentorProps {
  mentor: MentorData | null
}

export default function CurrentMentor({ mentor }: CurrentMentorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">Your Mentor</h2>
        {mentor && (
          <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center">
            View Profile
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>

      {mentor ? (
        <div className="flex items-center space-x-4">
          <Image
            src={mentor.avatar || '/placeholder.svg'}
            alt={mentor.name}
            className="w-16 h-16 rounded-full"
            width={64}
            height={64}
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600">
              {mentor.position} • {mentor.team}
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              Next session: {mentor.nextSession}
            </div>
          </div>
          <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mentor Assigned Yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get paired with an expert mentor who can help you reach your hockey goals and guide your
            development.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/mentors">
              <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Browse Mentors
              </button>
            </Link>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Book a Call
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
