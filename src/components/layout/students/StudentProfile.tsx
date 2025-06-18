'use client'

import { motion } from 'motion/react'
import { User, Target, Trophy, Calendar, Edit } from 'lucide-react'
import { useState } from 'react'
import EditProfileModal from './EditProfileModal'

interface StudentData {
  id: number
  firstName: string
  lastName: string
  currentTeam: string
  position: string
  currentLevel: string
  age: number
  user: {
    name: string
    image?: string | null
  }
}

interface StudentProfileProps {
  student: StudentData
}

export default function StudentProfile({ student }: StudentProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">Your Profile</h2>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Team</p>
              <p className="font-medium text-gray-900">{student.currentTeam}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p className="font-medium text-gray-900 capitalize">{student.position}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Trophy className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Level of Play</p>
              <p className="font-medium text-gray-900">{student.currentLevel}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-medium text-gray-900">{student.age} years old</p>
            </div>
          </div>
        </div>
      </motion.div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={student}
      />
    </>
  )
}
