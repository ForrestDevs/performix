import { Suspense } from 'react'
import { CourseList } from './components/CourseList'
import { CourseFilters } from './components/CourseFilters'
import { SearchInput } from '@/components/ui/SearchInput'

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="text-lg text-gray-600">
            Discover courses from expert instructors around the world
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <CourseFilters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <Suspense fallback={<div>Loading search...</div>}>
                <SearchInput placeholder="Search courses..." />
              </Suspense>
            </div>

            <Suspense fallback={<div>Loading courses...</div>}>
              <CourseList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
