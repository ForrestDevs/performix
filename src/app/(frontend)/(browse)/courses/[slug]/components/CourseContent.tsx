import { Course, Chapter, Lesson } from '@/payload-types'
import { getPayload } from '@/lib/utilities/getPayload'

interface CourseContentProps {
  course: Course
}

async function getChapters(course: Course) {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'chapters',
    where: { course: { equals: course.id } },
    depth: 10,
  })

  return res.docs as Chapter[]
}

async function getLessons(chapter: Chapter) {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'lessons',
    where: { chapter: { equals: chapter.id } },
    depth: 10,
  })

  return res.docs as Lesson[]
}

export async function CourseContent({ course }: CourseContentProps) {
  // Fetch chapters and lessons
  const chapters = await getChapters(course)
  const allLessons = await Promise.all(chapters.map(getLessons))
  const lessons = allLessons.flat()

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 pb-4">Course Content</h2>
      </div>

      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {chapters.map((chapter: any) => (
            <li key={chapter.id} className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{chapter.title}</h3>
                  {chapter.description && (
                    <p className="mt-1 text-sm text-gray-500">{chapter.description}</p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {chapter.lessons?.length || 0} lessons
                  </span>
                </div>
              </div>

              {chapter.lessons?.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {chapter.lessons.map((lesson: any) => (
                    <li key={lesson.id} className="flex items-start space-x-3 text-sm">
                      <div className="flex-shrink-0">
                        {lesson.isPreview ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <span className="text-xs font-medium leading-none text-green-700">
                              P
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300">
                            <span className="text-xs font-medium leading-none text-gray-500">
                              {lesson.displayOrder}
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                          {lesson.estimatedDuration && (
                            <p className="text-xs text-gray-500">{lesson.estimatedDuration} min</p>
                          )}
                        </div>
                        {lesson.isPreview && (
                          <p className="text-xs text-green-700">Preview available</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
