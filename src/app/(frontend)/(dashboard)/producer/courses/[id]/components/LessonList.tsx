'use client'

import { useState } from 'react'
import { Course, Lesson } from '@/payload-types'
import { deleteLesson } from '@/lib/data/course'

interface LessonListProps {
  course: Course
  chapterId: number | null
  onBack?: () => void
}

export function LessonList({ course, chapterId, onBack }: LessonListProps) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const handleDelete = async (lessonId: number) => {
    try {
      setIsDeleting(lessonId)
      await deleteLesson(lessonId)
      // Refresh the page to show updated list
      window.location.reload()
    } catch (error) {
      console.error('Error deleting lesson:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  const lessons = course.lessons?.docs?.filter((lesson: Lesson) =>
    chapterId ? lesson.chapter === chapterId : !lesson.chapter,
  )

  if (!lessons?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-sm font-medium text-gray-900">No lessons yet</h3>
        <p className="mt-2 text-sm text-gray-500">Get started by adding your first lesson.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {lessons.map((lesson: Lesson) => (
          <li key={lesson.id}>
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-gray-900">{lesson.title}</p>
                  <div className="ml-2 flex flex-shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        lesson.isPreview
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {lesson.isPreview ? 'Preview' : 'Regular'}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="truncate">
                      {lesson.contentType.charAt(0).toUpperCase() + lesson.contentType.slice(1)} •{' '}
                      {lesson.estimatedDuration} min
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-6 flex flex-shrink-0 items-center space-x-4">
                <button
                  onClick={() => handleDelete(lesson.id)}
                  disabled={isDeleting === lesson.id}
                  className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  {isDeleting === lesson.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
