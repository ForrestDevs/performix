'use client'

import { useState } from 'react'
import { Course } from '@/payload-types'
import { ChapterList } from './ChapterList'
import { LessonList } from './LessonList'
import { ChapterForm } from './ChapterForm'
import { LessonForm } from './LessonForm'

interface ContentEditorProps {
  course: Course
}

type EditorMode = 'chapters' | 'lessons' | 'new-chapter' | 'new-lesson'

export function ContentEditor({ course }: ContentEditorProps) {
  // For flat structure, start in lessons mode
  // For hierarchical, start in chapters mode
  const [mode, setMode] = useState<EditorMode>(
    course.structureType === 'hierarchical' ? 'chapters' : 'lessons',
  )
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  return (
    <div className="bg-white shadow sm:rounded-lg divide-y divide-gray-200">
      {/* Header */}
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Course Content</h3>
            <p className="mt-2 text-sm text-gray-500">
              {course.structureType === 'hierarchical'
                ? 'Organize your course content into chapters and lessons'
                : 'Add and manage lessons for your course'}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {course.structureType === 'hierarchical' ? (
              // Hierarchical structure controls
              <>
                {mode === 'chapters' && (
                  <button
                    type="button"
                    onClick={() => setMode('new-chapter')}
                    className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Add Chapter
                  </button>
                )}
                {mode === 'lessons' && (
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChapter(null)
                        setMode('chapters')
                      }}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Back to Chapters
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('new-lesson')}
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      Add Lesson
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Flat structure controls
              <>
                {mode === 'lessons' && (
                  <button
                    type="button"
                    onClick={() => setMode('new-lesson')}
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Add Lesson
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 py-5 sm:p-6">
        {course.structureType === 'hierarchical' ? (
          // Hierarchical structure content
          <>
            {mode === 'chapters' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900">Course Structure</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Your course is organized hierarchically. Start by creating chapters, then add
                    lessons to each chapter.
                  </p>
                </div>
                <ChapterList
                  course={course}
                  onChapterSelect={(chapterId) => {
                    setSelectedChapter(chapterId)
                    setMode('lessons')
                  }}
                />
              </div>
            )}

            {mode === 'lessons' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900">Chapter Content</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Add and manage lessons for this chapter. You can add video or article content.
                  </p>
                </div>
                <LessonList
                  course={course}
                  chapterId={selectedChapter}
                  onBack={() => {
                    setSelectedChapter(null)
                    setMode('chapters')
                  }}
                />
              </div>
            )}
          </>
        ) : (
          // Flat structure content
          <>
            {mode === 'lessons' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900">Course Lessons</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Add and manage lessons for your course. You can add video or article content.
                  </p>
                </div>
                <LessonList course={course} chapterId={null} />
              </div>
            )}
          </>
        )}

        {mode === 'new-chapter' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-medium text-gray-900">New Chapter</h4>
              <p className="mt-1 text-sm text-gray-500">
                Create a new chapter to organize your course content.
              </p>
            </div>
            <ChapterForm
              course={course}
              onSuccess={() => setMode('chapters')}
              onCancel={() => setMode('chapters')}
            />
          </div>
        )}

        {mode === 'new-lesson' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-medium text-gray-900">New Lesson</h4>
              <p className="mt-1 text-sm text-gray-500">
                Add a new lesson with video or article content. You can also make this lesson
                available for preview.
              </p>
            </div>
            <LessonForm
              course={course}
              chapterId={course.structureType === 'hierarchical' ? selectedChapter : null}
              onSuccess={() => setMode('lessons')}
              onCancel={() => setMode('lessons')}
            />
          </div>
        )}
      </div>
    </div>
  )
}
