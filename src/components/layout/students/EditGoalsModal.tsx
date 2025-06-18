'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Save, Plus, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { updateStudentProfileAction } from '@/lib/actions/student'

interface StudentData {
  id: number
  goals: string[]
}

interface EditGoalsModalProps {
  isOpen: boolean
  onClose: () => void
  student: StudentData
}

export default function EditGoalsModal({ isOpen, onClose, student }: EditGoalsModalProps) {
  const [goals, setGoals] = useState<string[]>(student.goals.length > 0 ? student.goals : [''])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addGoal = () => {
    setGoals([...goals, ''])
  }

  const removeGoal = (index: number) => {
    if (goals.length > 1) {
      const newGoals = goals.filter((_, i) => i !== index)
      setGoals(newGoals)
    }
  }

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...goals]
    newGoals[index] = value
    setGoals(newGoals)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const filteredGoals = goals.filter((goal) => goal.trim() !== '')

    if (filteredGoals.length === 0) {
      toast.error('Please add at least one goal')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await updateStudentProfileAction(student.id.toString(), {
        goals: filteredGoals.join('\n'),
      })

      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('Goals updated successfully!')
        onClose()
        // Trigger page refresh to show updated data
        window.location.reload()
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setGoals(student.goals.length > 0 ? student.goals : [''])
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-0 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 font-['Space_Grotesk'] mb-6">
                    Edit Your Goals
                  </h3>

                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-3">
                      {goals.map((goal, index) => (
                        <div key={index} className="flex space-x-2">
                          <div className="flex-1">
                            <textarea
                              value={goal}
                              onChange={(e) => updateGoal(index, e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-h-[80px] resize-none"
                              placeholder={`Goal ${index + 1} (e.g., Get recruited to D1 college)`}
                              rows={3}
                            />
                          </div>
                          {goals.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeGoal(index)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {goals.length < 5 && (
                      <button
                        type="button"
                        onClick={addGoal}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Goal
                      </button>
                    )}

                    <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Goals
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Set specific, measurable goals that will help you track
                      your progress and stay motivated in your hockey journey.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
