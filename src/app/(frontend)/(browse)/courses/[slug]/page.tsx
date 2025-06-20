import React from 'react'
import { getPayload } from '@/lib/utilities/getPayload'
import { COURSES_SLUG } from '@/payload/collections/constants'
import { SerializedEditorState } from 'lexical'
import { getCurrentUser } from '@/lib/data/auth'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string | undefined }>

export default async function Course({ params }: { params: Params }) {
  const user = await getCurrentUser()
  const { slug } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: COURSES_SLUG,
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  const course = docs[0]

  if (!course) {
    return notFound()
  }

  // Transform course data for client components
  const courseData = {
    id: course.id,
    title: course.title || '',
    description: course.description || '',
    richText: course.richText as SerializedEditorState,
    thumbnail: course.thumbnail,
    chapters: course.chapters || [],
    lessons: course.lessons || [],
    structureType: course.structureType || 'flat',
    freePreview: course.freePreview || false,
    price: course.price || 0,
    status: course.status || 'draft',
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  }

  return <pre>{JSON.stringify(courseData, null, 2)}</pre>

  //   return <CoursePageClient course={courseData} isAuthenticated={!!user} />
}
