import Link from 'next/link'
import Image from 'next/image'
import { Course, Media } from '@/payload-types'
import getPayload from '@/lib/utilities/getPayload'
import RichText from '@/components/RichText'
async function getCourses() {
  const payload = await getPayload()
  try {
    const res = await payload.find({
      collection: 'courses',
      where: {
        status: {
          equals: 'published',
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

export async function CourseList() {
  const courses = await getCourses()

  if (!courses.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const thumbnail = course.thumbnail as Media
        return (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="aspect-h-9 aspect-w-16 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-48">
              {course.thumbnail ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${thumbnail.filename}`}
                  alt={course.title}
                  width={640}
                  height={360}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No thumbnail</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                <span aria-hidden="true" className="absolute inset-0" />
                {course.title}
              </h3>
              <RichText data={course.description} />
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">${course.price}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
