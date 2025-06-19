import Link from 'next/link'
import Image from 'next/image'
import { Course, Media } from '@/payload-types'
// import { CourseStatus } from './components/CourseStatus'
import { getPayload } from '@/lib/utilities/getPayload'
import { getCurrentUser } from '@/lib/data/auth'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { Media as MediaComponent } from '@/components/Media'

async function getProducerCourses(producerId: number) {
  const payload = await getPayload()

  try {
    const res = await payload.find({
      collection: 'courses',
      where: {
        producer: {
          equals: producerId,
        },
      },
      depth: 10,
    })

    if (!res.docs) {
      throw new Error('Failed to fetch courses')
    }

    return res.docs as Course[]
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export default async function ProducerCoursesPage() {
  const user = await getCurrentUser()

  if (!user) {
    return <PayloadRedirects url="/producer/login" />
  }

  const courses = await getProducerCourses(user.id)

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your courses including their title, status, and other details.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/producer/courses/new"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Create Course
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Course
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Students
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {courses.map((course) => {
                    return (
                      <tr key={course.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {course.thumbnail ? (
                                <MediaComponent
                                  resource={course.thumbnail}
                                  imgClassName="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{course.title}</div>
                              <div className="text-gray-500">
                                {/* <RichText data={course.description} /> */}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {/* <CourseStatus status={course.status} /> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${course.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {/* We'll implement this later */}-
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/producer/courses/${course.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
