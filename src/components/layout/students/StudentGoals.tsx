'use client'

import { motion } from 'motion/react'
import { Target, Edit, Plus } from 'lucide-react'
import { useState } from 'react'
import EditGoalsModal from './EditGoalsModal'

interface StudentData {
  id: number
  goals: string[]
}

interface StudentGoalsProps {
  student: StudentData
}

export default function StudentGoals({ student }: StudentGoalsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-['Space_Grotesk']">Your Goals</h2>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Update
          </button>
        </div>

        {student.goals.length > 0 ? (
          <div className="space-y-3">
            {student.goals.map((goal, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-1 bg-cyan-100 rounded-full mt-1">
                  <Target className="w-3 h-3 text-cyan-600" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">No Goals Set Yet</h3>
            <p className="text-gray-600 text-sm mb-4">
              Set your hockey goals to track your progress and stay motivated.
            </p>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Goals
            </button>
          </div>
        )}
      </motion.div>

      <EditGoalsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={student}
      />
    </>
  )
}
