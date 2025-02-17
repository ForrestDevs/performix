import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/data/auth'
import getPayload from '@/lib/utilities/getPayload'
import { Chapter, Course, Lesson, Media } from '@/payload-types'
import RichText from '@/components/RichText'

async function getCourse(slug: string) {
  const payload = await getPayload()
  try {
    const res = await payload.find({
      collection: 'courses',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 10,
    })

    if (!res.docs) {
      throw new Error('Failed to fetch course')
    }

    return res.docs[0] as Course
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

async function getEnrollment(courseId: number, userId: number) {
  const payload = await getPayload()
  try {
    const res = await payload.find({
      collection: 'enrollments',
      where: {
        course: {
          equals: courseId,
        },
        user: {
          equals: userId,
        },
      },
      depth: 10,
    })

    if (!res.docs) {
      throw new Error('Failed to fetch enrollment')
    }

    return res.docs[0]
  } catch (error) {
    console.error('Error fetching enrollment:', error)
    return null
  }
}

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EnrolledCoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const user = await getCurrentUser()
  const course = await getCourse(slug)

  if (!course || !user) {
    notFound()
  }

  const enrollment = await getEnrollment(course.id, user.id)

  if (!enrollment) {
    notFound()
  }

  const thumbnail = course.thumbnail as Media
  const progress = enrollment.progress || {}
  const totalLessons = course.lessons?.docs?.length || 0
  const completedLessons = Object.values(progress).filter((status) => status === 'completed').length
  const progressPercentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Find the next incomplete lesson
  const nextLesson = course.lessons?.docs?.find((lesson) => {
    const enrolledLesson = lesson as Lesson
    return !progress[enrolledLesson.id]
  }) as Lesson | undefined

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Course Info */}
          <div className="lg:max-w-lg">
            <div className="flex items-center space-x-2">
              <Link href="/my/courses" className="text-sm text-blue-600 hover:text-blue-500">
                ← Back to My Courses
              </Link>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{progressPercentage}% Complete</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{course.title}</h1>
            <div className="mt-4">
              <RichText data={course.description} />
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  {completedLessons} of {totalLessons} lessons completed
                </span>
              </div>
            </div>

            {nextLesson && (
              <div className="mt-6">
                <Link
                  href={`/my/courses/${course.slug}/lessons/${nextLesson.id}`}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Continue Learning
                </Link>
              </div>
            )}
          </div>

          {/* Course Preview */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              {thumbnail ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${thumbnail.filename}`}
                  alt={course.title}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No preview available</span>
                </div>
              )}
            </div>
          </div>

          {/* Course Content */}
          <div className="mt-10 lg:col-span-2">
            <div className="bg-white">
              <div className="border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 pb-4">Course Content</h2>
              </div>

              <div className="mt-6 flow-root">
                {(course.chapters?.docs?.length ?? 0 > 0) ? (
                  // Render chapters with nested lessons
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {course.chapters?.docs?.map((chapter) => {
                      const enrolledChapter = chapter as Chapter

                      return (
                        <li key={enrolledChapter.id} className="py-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                {enrolledChapter.title}
                              </h3>
                              {enrolledChapter.description && (
                                <p className="mt-1 text-sm text-gray-500">
                                  {enrolledChapter.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {enrolledChapter?.lessons?.docs?.length ??
                            (0 > 0 && (
                              <ul className="mt-4 space-y-3">
                                {enrolledChapter.lessons?.docs?.map((lesson) => {
                                  const enrolledLesson = lesson as Lesson
                                  const isCompleted = progress[enrolledLesson.id] === 'completed'

                                  return (
                                    <li
                                      key={enrolledLesson.id}
                                      className="flex items-start space-x-3 text-sm"
                                    >
                                      <div className="flex-shrink-0">
                                        {isCompleted ? (
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                            <svg
                                              className="h-4 w-4 text-green-600"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              strokeWidth={2}
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                              />
                                            </svg>
                                          </span>
                                        ) : (
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300">
                                            <span className="text-xs font-medium leading-none text-gray-500">
                                              {enrolledLesson.displayOrder}
                                            </span>
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                          <Link
                                            href={`/my/courses/${course.slug}/lessons/${enrolledLesson.id}`}
                                            className={`font-medium ${
                                              isCompleted ? 'text-gray-500' : 'text-gray-900'
                                            } hover:text-blue-600`}
                                          >
                                            {enrolledLesson.title}
                                          </Link>
                                          {enrolledLesson.estimatedDuration && (
                                            <p className="text-xs text-gray-500">
                                              {enrolledLesson.estimatedDuration} min
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            ))}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  // Render flat list of lessons
                  <ul className="space-y-3">
                    {course.lessons?.docs?.map((lesson) => {
                      const enrolledLesson = lesson as Lesson
                      const isCompleted = progress[enrolledLesson.id] === 'completed'

                      return (
                        <li key={enrolledLesson.id} className="flex items-start space-x-3 text-sm">
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                <svg
                                  className="h-4 w-4 text-green-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
                              </span>
                            ) : (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300">
                                <span className="text-xs font-medium leading-none text-gray-500">
                                  {enrolledLesson.displayOrder}
                                </span>
                              </span>
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <Link
                                href={`/my/courses/${course.slug}/lessons/${enrolledLesson.id}`}
                                className={`font-medium ${
                                  isCompleted ? 'text-gray-500' : 'text-gray-900'
                                } hover:text-blue-600`}
                              >
                                {enrolledLesson.title}
                              </Link>
                              {enrolledLesson.estimatedDuration && (
                                <p className="text-xs text-gray-500">
                                  {enrolledLesson.estimatedDuration} min
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
