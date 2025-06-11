import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Course, Media } from '@/payload-types'
import { EnrollButton } from './components/EnrollButton'
import RichText from '@/components/RichText'
import { CourseContent } from './components/CourseContent'
import { getCurrentUser } from '@/lib/data/auth'
import { getPayload } from '@/lib/utilities/getPayload'
import { Media as MediaComponent } from '@/components/Media'
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

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const user = await getCurrentUser()
  const course = await getCourse(slug)

  if (!course) {
    notFound()
  }

  const thumbnail = course.thumbnail as Media

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Course Info */}
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{course.title}</h1>
            <div className="mt-4">
              <RichText data={course.description} />
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">What you&apos;ll learn</h2>
              <div className="mt-4 space-y-2">
                {course.whatYouWillLearn?.map((item, index) => (
                  <div key={index} className="flex">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-500">{item.learning}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Requirements</h2>
              <div className="mt-4 space-y-2">
                {course.requirements?.map((item, index) => (
                  <div key={index} className="flex">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-500">{item.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Preview */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              {course.thumbnail ? (
                <MediaComponent
                  resource={course.thumbnail}
                  imgClassName="h-full w-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No preview available</span>
                </div>
              )}
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                {/* {course.averageRating && (
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="ml-1 text-lg text-gray-900">
                      {course.averageRating.toFixed(1)}
                    </span>
                    {course.totalReviews && (
                      <span className="ml-1 text-sm text-gray-500">
                        ({course.totalReviews} reviews)
                      </span>
                    )}
                  </div>
                )} */}
              </div>

              <div className="mt-6">
                <EnrollButton course={course} user={user} />
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="mt-10 lg:col-span-2">
            <CourseContent course={course} />
          </div>
        </div>
      </div>
    </div>
  )
}
