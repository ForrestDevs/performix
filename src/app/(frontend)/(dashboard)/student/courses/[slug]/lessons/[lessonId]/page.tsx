import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/data/auth'
import { getPayload } from '@/lib/utilities/getPayload'
import { Course, Lesson } from '@/payload-types'
import RichText from '@/components/RichText'
import { LessonContent } from './components/LessonContent'
import { LessonProgress } from './components/LessonProgress'

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

async function getLesson(lessonId: number) {
  const payload = await getPayload()
  try {
    const lesson = await payload.findByID({
      collection: 'lessons',
      id: lessonId,
      depth: 10,
    })
    return lesson as Lesson
  } catch (error) {
    console.error('Error fetching lesson:', error)
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

interface LessonPageProps {
  params: Promise<{
    slug: string
    lessonId: number
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonId } = await params
  const user = await getCurrentUser()
  const course = await getCourse(slug)
  const lesson = await getLesson(lessonId)

  if (!course || !lesson || !user) {
    notFound()
  }

  const enrollment = await getEnrollment(course.id, user.id)

  if (!enrollment) {
    notFound()
  }

  const progress = enrollment.progress || {}
  const isCompleted = progress[lesson.id] === 'completed'

  // Get the next and previous lessons
  const allLessons = (course.lessons?.docs as Lesson[]) || []
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id)
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2">
          <Link
            href={`/my/courses/${course.slug}`}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            ← Back to Course
          </Link>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">Lesson {lesson.displayOrder}</span>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{lesson.title}</h1>
          {lesson.estimatedDuration && (
            <p className="mt-2 text-sm text-gray-500">{lesson.estimatedDuration} min</p>
          )}
        </div>

        <div className="mt-8">
          <LessonContent lesson={lesson} />
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <LessonProgress
            course={course}
            lesson={lesson}
            enrollment={enrollment}
            isCompleted={isCompleted}
          />

          <div className="mt-8 flex items-center justify-between">
            {previousLesson ? (
              <Link
                href={`/my/courses/${course.slug}/lessons/${previousLesson.id}`}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                ← Previous Lesson
              </Link>
            ) : (
              <div />
            )}

            {nextLesson && (
              <Link
                href={`/my/courses/${course.slug}/lessons/${nextLesson.id}`}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Next Lesson →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
