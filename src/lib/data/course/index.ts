'use server'

import { Course, Lesson } from '@/payload-types'
import { getPayload } from '@/lib/utilities/getPayload'

export async function enrollInCourse(courseId: number, userId: number) {
  const payload = await getPayload()
  const enrollment = await payload.create({
    collection: 'enrollments',
    data: {
      course: courseId,
      user: userId,
      status: 'active',
      purchased_at: new Date().toISOString(),
    },
  })
  return enrollment
}

export async function createCourse(course: Omit<Course, 'id' | 'updatedAt' | 'createdAt'>) {
  console.log('course', course)

  const payload = await getPayload()
  const createdCourse = await payload.create({
    collection: 'courses',
    data: course,
  })
  return createdCourse
}

export async function createMedia(file: File) {
  const payload = await getPayload()
  const doc = await payload.create({
    collection: 'media',
    data: {
      alt: file?.name,
      mimeType: file?.type,
      filename: file?.name,
      filesize: file?.size,
    },
    file: {
      data: Buffer.from(await file.arrayBuffer()),
      mimetype: file?.type,
      name: file?.name,
      size: file?.size,
    },
  })
  return doc
}

export async function updateCourse(courseId: number, course: Partial<Course>) {
  const payload = await getPayload()
  const updatedCourse = await payload.update({
    collection: 'courses',
    id: courseId,
    data: course,
  })
  return updatedCourse
}

export async function createChapter(data: {
  title: string
  description?: string
  course: number
  parentChapter?: number
  order: number
  depth: number
}) {
  const payload = await getPayload()
  const chapter = await payload.create({
    collection: 'chapters',
    data,
  })
  return chapter
}

export async function updateChapter(
  chapterId: number,
  data: {
    title?: string
    description?: string
    order?: number
  },
) {
  const payload = await getPayload()
  const chapter = await payload.update({
    collection: 'chapters',
    id: chapterId,
    data,
  })
  return chapter
}

export async function deleteChapter(chapterId: number) {
  const payload = await getPayload()
  await payload.delete({
    collection: 'chapters',
    id: chapterId,
  })
}

export async function createLesson(newLesson: Omit<Lesson, 'id' | 'updatedAt' | 'createdAt'>) {
  const payload = await getPayload()
  try {
    const lesson = await payload.create({
      collection: 'lessons',
      data: {
        ...newLesson,
      },
    })
    return lesson
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

export async function updateLesson(lessonId: number, lesson: Partial<Lesson>) {
  const payload = await getPayload()
  const updatedLesson = await payload.update({
    collection: 'lessons',
    id: lessonId,
    data: lesson,
  })
  return updatedLesson
}

export async function deleteLesson(lessonId: number) {
  const payload = await getPayload()
  await payload.delete({
    collection: 'lessons',
    id: lessonId,
  })
}

export async function getCourseAnalytics(courseId: number) {
  const payload = await getPayload()

  // Get total enrollments
  const enrollments = await payload.find({
    collection: 'enrollments',
    where: {
      course: {
        equals: courseId,
      },
    },
  })

  // Get reviews
  const reviews = await payload.find({
    collection: 'reviews',
    where: {
      course: {
        equals: courseId,
      },
    },
  })

  // Calculate metrics
  const totalEnrollments = enrollments.totalDocs
  const activeEnrollments = enrollments.docs.filter((e) => e.status === 'active').length
  const completedEnrollments = enrollments.docs.filter((e) => e.status === 'completed').length
  const totalReviews = reviews.totalDocs
  const averageRating =
    reviews.docs.length > 0
      ? reviews.docs.reduce((sum, review) => sum + review.rating, 0) / reviews.docs.length
      : 0

  return {
    totalEnrollments,
    activeEnrollments,
    completedEnrollments,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    reviews: reviews.docs,
  }
}

export async function updateProgress(
  enrollmentId: number,
  lessonId: number,
  status: 'not_started' | 'in_progress' | 'completed',
) {
  const payload = await getPayload()

  // Get the current enrollment
  const enrollment = await payload.findByID({
    collection: 'enrollments',
    id: enrollmentId,
    depth: 10,
  })

  const enrolledCourse = enrollment.course as Course

  // Update the progress
  const currentProgress = (enrollment.progress || {}) as Record<
    string,
    'not_started' | 'in_progress' | 'completed'
  >
  const updatedProgress = {
    ...currentProgress,
    [lessonId]: status,
  }

  // Check if all lessons are completed
  const course = await payload.findByID({
    collection: 'courses',
    id: enrolledCourse.id,
    depth: 10,
  })

  const allLessons = (course.lessons?.docs || []) as Lesson[]
  const allCompleted = allLessons.every((lesson) => updatedProgress[lesson.id] === 'completed')

  // Update the enrollment
  const updatedEnrollment = await payload.update({
    collection: 'enrollments',
    id: enrollmentId,
    data: {
      progress: updatedProgress,
      status: allCompleted ? 'completed' : 'active',
      completed_at: allCompleted ? new Date().toISOString() : null,
    },
  })

  return updatedEnrollment
}
