'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Course, User } from '@/payload-types'
import { enrollInCourse } from '@/lib/data/course'
interface EnrollButtonProps {
  course: Course
  user: User | null
}

export function EnrollButton({ course, user }: EnrollButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${course.slug}`)
      return
    }

    try {
      setIsLoading(true)

      const res = await enrollInCourse(course.id, user.id)

      if (!res) {
        throw new Error('Failed to enroll in course')
      }

      router.push(`/my/courses/${course.slug}`)
      router.refresh()
    } catch (error) {
      console.error('Error enrolling in course:', error)
      // Here you would typically show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={isLoading}
      className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Enrolling...' : 'Enroll Now'}
    </button>
  )
}
