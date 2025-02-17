import Link from 'next/link'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/data/auth'
import getPayload from '@/lib/utilities/getPayload'
import { Course, Media } from '@/payload-types'

async function getEnrolledCourses(userId: number) {
  const payload = await getPayload()
  try {
    const enrollments = await payload.find({
      collection: 'enrollments',
      where: {
        user: {
          equals: userId,
        },
      },
      depth: 10,
    })

    return enrollments.docs
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return []
  }
}

export default async function MyCoursesPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const enrollments = await getEnrolledCourses(user.id)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">My Learning</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your enrolled courses and their progress.
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              {enrollments.length === 0 ? (
                <div className="text-center py-12 bg-white">
                  <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Get started by browsing our available courses.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/courses"
                      className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      Browse Courses
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white">
                  <ul role="list" className="divide-y divide-gray-200">
                    {enrollments.map((enrollment) => {
                      const course = enrollment.course as Course
                      const thumbnail = course.thumbnail as Media
                      const progress = enrollment.progress || {}
                      const totalLessons = course.lessons?.docs?.length || 0
                      const completedLessons = Object.values(progress).filter(
                        (status) => status === 'completed',
                      ).length
                      const progressPercentage = totalLessons
                        ? Math.round((completedLessons / totalLessons) * 100)
                        : 0

                      return (
                        <li key={enrollment.id}>
                          <div className="flex items-center p-4 sm:px-6">
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex-shrink-0">
                                {thumbnail ? (
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${thumbnail.filename}`}
                                    alt={course.title}
                                    width={80}
                                    height={45}
                                    className="object-cover rounded"
                                  />
                                ) : (
                                  <div className="h-12 w-12 rounded bg-gray-200" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1 px-4">
                                <div>
                                  <Link
                                    href={`/my/courses/${course.slug}`}
                                    className="truncate text-sm font-medium text-blue-600 hover:text-blue-500"
                                  >
                                    {course.title}
                                  </Link>
                                  <div className="mt-2 flex">
                                    <div className="flex items-center text-sm text-gray-500">
                                      <p className="truncate">
                                        {completedLessons} of {totalLessons} lessons completed
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <div className="flex items-center">
                                      <div className="flex-1">
                                        <div className="h-2 rounded-full bg-gray-200">
                                          <div
                                            className="h-2 rounded-full bg-blue-600"
                                            style={{ width: `${progressPercentage}%` }}
                                          />
                                        </div>
                                      </div>
                                      <span className="ml-2 text-sm text-gray-500">
                                        {progressPercentage}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Link
                                href={`/my/courses/${course.slug}`}
                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                {enrollment.status === 'completed' ? 'Review' : 'Continue'}
                              </Link>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
