import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/data/auth'
import { getPayload } from '@/lib/utilities/getPayload'
import { Course, User } from '@/payload-types'
// import { CourseForm } from '../../components/CourseForm'
import { ContentEditor } from '../components/ContentEditor'

async function getCourse(id: number) {
  const payload = await getPayload()
  try {
    const course = await payload.findByID({
      collection: 'courses',
      id: id,
      depth: 2,
    })
    return course as Course
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

type EditCoursePageProps = {
  params: Promise<{ id: number }>
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params
  const user = await getCurrentUser()
  const course = await getCourse(id)

  if (!course) {
    notFound()
  }

  // const producer = course.producer as User

  // Verify ownership
  // if (user?.id !== producer.id) {
  //   notFound()
  // }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Edit Course: {course.title}
          </h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Information</h3>
          {/* <CourseForm user={user} initialData={course} /> */}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Content</h3>
          <ContentEditor course={course} />
        </div>
      </div>
    </div>
  )
}
