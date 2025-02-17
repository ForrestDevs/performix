'use client'

import { useState } from 'react'
import { Chapter, Course } from '@/payload-types'
import { deleteChapter } from '@/lib/data/course'

interface ChapterListProps {
  course: Course
  onChapterSelect: (chapterId: number) => void
}

export function ChapterList({ course, onChapterSelect }: ChapterListProps) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const handleDelete = async (chapterId: number) => {
    try {
      setIsDeleting(chapterId)
      await deleteChapter(chapterId)
      // Refresh the page to show updated list
      window.location.reload()
    } catch (error) {
      console.error('Error deleting chapter:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {course.chapters?.docs?.map((chapter: Chapter) => (
          <li key={chapter.id}>
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onChapterSelect(chapter.id)}
                    className="truncate text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    {chapter.title}
                  </button>
                  <div className="ml-2 flex flex-shrink-0">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {chapter.lessons?.docs?.length || 0} lessons
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex">
                  <div className="flex items-center text-sm text-gray-500">
                    <p className="truncate">{chapter.description}</p>
                  </div>
                </div>
              </div>
              <div className="ml-6 flex flex-shrink-0 items-center space-x-4">
                <button
                  onClick={() => handleDelete(chapter.id)}
                  disabled={isDeleting === chapter.id}
                  className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  {isDeleting === chapter.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
