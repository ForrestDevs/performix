'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Course, Lesson } from '@/payload-types'
import { updateProgress } from '@/lib/data/course'

interface LessonProgressProps {
  course: Course
  lesson: Lesson
  enrollment: any
  isCompleted: boolean
}

export function LessonProgress({ course, lesson, enrollment, isCompleted }: LessonProgressProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = async () => {
    try {
      setIsLoading(true)

      await updateProgress(enrollment.id, lesson.id, 'completed')

      // Find the next lesson
      const allLessons = (course.lessons?.docs as Lesson[]) || []
      const currentIndex = allLessons.findIndex((l) => l.id === lesson.id)
      const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

      // Refresh the page to show updated progress
      router.refresh()

      // If there's a next lesson, navigate to it
      if (nextLesson) {
        router.push(`/my/courses/${course.slug}/lessons/${nextLesson.id}`)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {isCompleted ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            <svg
              className="-ml-0.5 mr-1.5 h-4 w-4 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Completed
          </span>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isLoading}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Marking as Complete...' : 'Mark as Complete'}
          </button>
        )}
      </div>
    </div>
  )
}
