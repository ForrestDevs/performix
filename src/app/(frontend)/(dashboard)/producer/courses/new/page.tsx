import { getCurrentUser } from '@/lib/data/auth'
// import { CourseForm } from '../components/CourseForm'

export default async function NewCoursePage() {
  const user = await getCurrentUser()

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Create New Course
          </h2>
        </div>
      </div>

      <div className="mt-8">
        {/* <CourseForm user={user} /> */}
      </div>
    </div>
  )
}
