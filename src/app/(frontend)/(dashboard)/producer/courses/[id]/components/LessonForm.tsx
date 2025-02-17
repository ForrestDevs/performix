'use client'

import { useState } from 'react'
import { Chapter, Course, Lesson } from '@/payload-types'
import { createLesson } from '@/lib/data/course'
import { RichTextEditor } from '@/components/RichTextEditor'

interface LessonFormProps {
  course: Course
  chapterId: number | null
  onSuccess: () => void
  onCancel: () => void
}

type FormData = {
  title: string
  contentType: 'article' | 'video'
  content: Lesson['content']
  isPreview: boolean
  estimatedDuration: number
}

export function LessonForm({ course, chapterId, onSuccess, onCancel }: LessonFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    title: '',
    contentType: 'article',
    content: {
      primaryContent: {
        type: 'rich_text',
        richTextData: null,
      },
      additionalResources: null,
      attachments: null,
      downloads: null,
    },
    isPreview: false,
    estimatedDuration: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    if (formData.contentType === 'video' && !formData.content.primaryContent.videoData?.videoUrl) {
      setError('Video URL is required')
      return
    }

    if (formData.contentType === 'article' && !formData.content.primaryContent.richTextData) {
      setError('Article content is required')
      return
    }

    try {
      setIsLoading(true)

      // Get the highest order number from existing lessons in this chapter
      const lessons = course.lessons?.docs?.filter(
        (lesson: Lesson) => lesson.chapter === chapterId,
      ) as Lesson[]

      const maxOrder =
        lessons?.reduce((max, lesson) => {
          return Math.max(max, lesson.order)
        }, 0) || 0

      // Calculate display order based on course structure
      let displayOrder = String(maxOrder + 1)
      if (course.structureType === 'hierarchical' && chapterId) {
        const chapter = course.chapters?.docs?.find((c: Chapter) => c.id === chapterId) as Chapter
        if (chapter) {
          displayOrder = `${chapter.order}.${maxOrder + 1}`
        }
      }

      const newLesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        course: course.id,
        chapter: chapterId || undefined,
        order: maxOrder + 1,
        displayOrder,
        contentType: formData.contentType,
        content: formData.content,
        isPreview: formData.isPreview,
        estimatedDuration: formData.estimatedDuration,
      }

      console.log('newLesson', newLesson)

      await createLesson(newLesson)

      onSuccess()
      window.location.reload()
    } catch (error) {
      console.error('Error creating lesson:', error)
      setError('Failed to create lesson. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-6 pt-8 first:pt-0">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Basic Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Provide the basic details about this lesson.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Lesson Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="e.g., Introduction to React Hooks"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="contentType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content Type
              </label>
              <div className="mt-2">
                <select
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contentType: e.target.value as 'article' | 'video',
                      content: {
                        ...prev.content,
                        primaryContent: {
                          type: e.target.value === 'video' ? 'video' : 'rich_text',
                          data: e.target.value === 'video' ? { videoUrl: '' } : { content: null },
                        },
                      },
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="estimatedDuration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Estimated Duration (minutes)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="estimatedDuration"
                  id="estimatedDuration"
                  min="0"
                  value={formData.estimatedDuration || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      estimatedDuration: parseInt(e.target.value),
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="isPreview"
                    name="isPreview"
                    type="checkbox"
                    checked={formData.isPreview}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, isPreview: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="isPreview" className="font-medium text-gray-900">
                    Preview Lesson
                  </label>
                  <p className="text-gray-500">
                    Make this lesson available for preview before enrollment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-8">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Lesson Content</h3>
            <p className="mt-1 text-sm text-gray-500">
              {formData.contentType === 'video'
                ? 'Add a video URL from YouTube or Vimeo'
                : 'Write your lesson content using the rich text editor'}
            </p>
          </div>

          <div>
            {formData.contentType === 'video' ? (
              <div>
                <label
                  htmlFor="videoUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Video URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="videoUrl"
                    id="videoUrl"
                    required
                    value={formData.content.primaryContent.videoData?.videoUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          primaryContent: {
                            type: 'video',
                            videoData: {
                              videoUrl: e.target.value,
                              videoProvider: 'youtube',
                            },
                          },
                        },
                      }))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Paste a YouTube or Vimeo video URL. Make sure the video is publicly accessible.
                </p>
              </div>
            ) : (
              <div>
                <div className="mt-2 prose prose-blue max-w-none">
                  <RichTextEditor
                    value={formData.content.primaryContent.richTextData}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          primaryContent: {
                            type: 'rich_text',
                            richTextData: value,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Creating Lesson...
            </>
          ) : (
            'Create Lesson'
          )}
        </button>
      </div>
    </form>
  )
}
