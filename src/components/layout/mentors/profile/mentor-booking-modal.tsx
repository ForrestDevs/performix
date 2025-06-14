'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'
import { useMentor } from './mentor-context'

interface MentorBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MentorBookingModal({ isOpen, onClose }: MentorBookingModalProps) {
  const { mentor } = useMentor()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Sample session types - in real app this would come from the Mentor payload type
  const sessionTypes = [
    {
      name: '1-on-1 Skill Development',
      duration: 60,
      price: 150,
      description: 'Personalized skill work focused on your specific needs and position',
    },
    {
      name: 'Video Analysis',
      duration: 45,
      price: 125,
      description: 'Detailed breakdown of game footage with actionable improvement strategies',
    },
  ]

  const [selectedSessionType, setSelectedSessionType] = useState(sessionTypes[0])
  const [isLoading, setIsLoading] = useState(false)

  // Get available dates (next 14 days)
  const getAvailableDates = () => {
    const dates: Date[] = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  // Get day of week from date
  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  }

  // Sample availability - in real app this would come from the Mentor payload type
  const availability = {
    monday: ['16:00', '17:00', '18:00', '19:00'],
    tuesday: ['15:00', '16:00', '17:00', '18:00'],
    wednesday: ['16:00', '17:00', '18:00', '19:00'],
    thursday: ['15:00', '16:00', '17:00', '18:00'],
    friday: ['16:00', '17:00', '18:00', '19:00'],
    saturday: ['09:00', '10:00', '11:00', '12:00', '13:00'],
    sunday: ['09:00', '10:00', '11:00', '12:00', '13:00'],
  }

  // Check if date has availability
  const hasAvailability = (date: Date) => {
    const day = getDayOfWeek(date)
    const dayAvailability = availability[day as keyof typeof availability]
    return dayAvailability ? dayAvailability.length > 0 : false
  }

  // Get available times for selected date
  const getAvailableTimes = () => {
    if (!selectedDate) return []
    const date = new Date(selectedDate)
    const day = getDayOfWeek(date)
    return availability[day as keyof typeof availability] || []
  }

  // Handle booking
  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      alert('Session booked successfully!')
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book a Session with {mentor.name}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Session Details</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{selectedSessionType?.name}</span>
                      <Badge className="bg-[#0891B2] text-white">
                        ${selectedSessionType?.price}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedSessionType?.duration} minutes</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedSessionType?.description}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Date & Time</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="h-5 w-5 text-[#0891B2]" />
                      <span>
                        {selectedDate
                          ? new Date(selectedDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Select a date'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 mt-2">
                      <Clock className="h-5 w-5 text-[#0891B2]" />
                      <span>{selectedTime || 'Select a time'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Date</h3>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {getAvailableDates()
                      .slice(0, 8)
                      .map((date, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date.toISOString())}
                          disabled={!hasAvailability(date)}
                          className={`p-2 rounded-lg text-center transition-all duration-200 ${
                            selectedDate === date.toISOString()
                              ? 'bg-[#0891B2] text-white'
                              : hasAvailability(date)
                                ? 'bg-white border border-gray-200 hover:border-[#0891B2] text-gray-900'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-xs font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-lg font-bold">{date.getDate()}</div>
                          <div className="text-xs">
                            {date.toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Available Times</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {getAvailableTimes().map((time, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg text-center transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-[#0891B2] text-white'
                              : 'bg-white border border-gray-200 hover:border-[#0891B2] text-gray-900'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
                    onClick={handleBookSession}
                    disabled={isLoading || !selectedDate || !selectedTime}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Complete Booking'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
