'use server'

import { revalidateTag, unstable_cache } from 'next/cache'
import { getPayload } from '../utilities/getPayload'
import { Module, Volume, Lesson, Video } from '@/payload-types'
import { cache } from '../utilities/cache'
import {
  LAB_SECTIONS_SLUG,
  LESSONS_SLUG,
  MODULES_SLUG,
  PROGRESS_SLUG,
  VIDEOS_SLUG,
  VOLUMES_SLUG,
} from '@/payload/collections/constants'
import { CACHE_TAGS } from '@/lib/cache/contants'
import { isEnrolledInAnyPlan } from './plans'
import { getCurrentUser } from './auth'
import { hasLessonAccess } from '../utilities/hasLessonAccess'

export interface LabStats {
  totalModules: number
  totalVolumes: number
  totalLessons: number
  totalVideos: number
  estimatedHours: number
}

/**
 * Get all modules with basic information (publicly accessible)
 * Used for: Lab homepage, navigation, marketing
 */

export async function getModules() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const modules = await payload.find({
        collection: 'modules',
        sort: 'order',
        limit: 100,
      })

      return modules.docs
    },
    {
      tags: [CACHE_TAGS.GET_LAB_MODULES],
    },
  )

  return cacheFn()
}

export async function getModuleCompletion({
  moduleId,
  userId,
}: {
  moduleId: number | undefined
  userId: number | undefined
}) {
  if (!moduleId || !userId) return null

  const cacheFn = cache(
    async (moduleId: number, userId: number) => {
      const payload = await getPayload()

      const labModule = await payload.find({
        collection: MODULES_SLUG,
        where: {
          id: { equals: moduleId },
        },
        limit: 1,
        depth: 2,
      })

      if (labModule.docs.length === 0) return null

      const lessons = labModule.docs[0]?.lessons?.docs ?? []

      const lessonIds = lessons.map((lesson) => (typeof lesson === 'object' ? lesson.id : lesson))

      const progressCount = await payload
        .count({
          collection: PROGRESS_SLUG,
          where: {
            and: [
              {
                lesson: { in: lessonIds },
              },
              {
                user: { equals: userId },
              },
              {
                completed: { equals: true },
              },
            ],
          },
        })
        .then((count) => count.totalDocs)

      const totalLessons = lessons.length

      const progressPercentage = (progressCount / totalLessons) * 100

      return {
        completedLessons: progressCount,
        totalLessons,
        completionPercentage: progressPercentage,
      }
    },
    {
      tags: [CACHE_TAGS.GET_LAB_PROGRESS + userId],
    },
  )

  return cacheFn(moduleId, userId)
}

export async function getVolumeCompletion({
  volumeId,
  userId,
}: {
  volumeId: number | undefined
  userId: number | undefined
}) {
  if (!volumeId || !userId) return null

  const cacheFn = cache(
    async (volumeId: number, userId: number) => {
      const payload = await getPayload()

      const volume = await payload.find({
        collection: VOLUMES_SLUG,
        where: {
          id: { equals: volumeId },
        },
        limit: 1,
      })

      if (volume.docs.length === 0) return null

      const lessons = volume.docs[0]?.lessons?.docs ?? []

      const lessonIds = lessons.map((lesson) => (typeof lesson === 'object' ? lesson.id : lesson))

      const progressCount = await payload
        .count({
          collection: PROGRESS_SLUG,
          where: {
            and: [
              {
                lesson: { in: lessonIds },
              },
              {
                user: { equals: userId },
              },
              {
                completed: { equals: true },
              },
            ],
          },
        })
        .then((count) => count.totalDocs)

      const totalLessons = lessons.length

      const progressPercentage = Math.round((progressCount / totalLessons) * 100 * 100) / 100

      return {
        completedLessons: progressCount,
        totalLessons,
        completionPercentage: progressPercentage,
      }
    },
    {
      tags: [CACHE_TAGS.GET_LAB_PROGRESS + volumeId],
    },
  )

  return cacheFn(volumeId, userId)
}

/**
 * Get a specific module with its volumes (publicly accessible)
 * Used for: Module detail pages showing volume structure
 */
export async function getModuleBySlug(slug: string) {
  const payload = await getPayload()

  const modules = await payload.find({
    collection: MODULES_SLUG,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 3,
  })

  if (modules.docs.length === 0) return null

  const volumes = await payload.find({
    collection: VOLUMES_SLUG,
    where: {
      module: { equals: modules.docs[0]?.id },
    },
    limit: 100,
    sort: 'order',
  })

  const totalLessons = modules.docs[0]?.lessons?.docs?.length || 0

  return {
    module: modules.docs[0],
    volumes: volumes.docs,
    totalLessons,
    estimatedTime: calculateEstimatedTime(totalLessons),
  }
  // const cacheFn = cache(
  //   async (slug: string) => {

  //   },
  //   {
  //     tags: [CACHE_TAGS.GET_LAB_MODULES_BY_SLUG + slug],
  //   },
  // )

  // return cacheFn(slug)
}

/**
 * Get a specific volume with its lessons (publicly accessible for structure, content access controlled)
 * Used for: Volume detail pages showing lesson list
 */
export async function getVolumeBySlug(moduleSlug: string, volumeSlug: string) {
  const cacheFn = cache(
    async (moduleSlug: string, volumeSlug: string) => {
      const payload = await getPayload()

      // Get the volume
      const volumes = await payload.find({
        collection: VOLUMES_SLUG,
        where: {
          slug: { equals: volumeSlug },
        },
        limit: 1,
        depth: 2,
      })

      if (volumes.docs.length === 0) return null

      const volume = volumes.docs[0]

      if (!volume) return null

      const lessons = await payload.find({
        collection: LESSONS_SLUG,
        where: {
          volume: { equals: volume.id },
        },
        limit: 100,
        sort: 'order',
      })

      return {
        ...volume,
        lessons: lessons.docs,
        totalLessons: lessons.totalDocs,
      }
    },
    {
      tags: [CACHE_TAGS.GET_LAB_VOLUMES_BY_SLUG + volumeSlug],
    },
  )
  return cacheFn(moduleSlug, volumeSlug)
}

/**
 * Get a specific lesson with full content (access controlled)
 * Used for: Lesson detail pages with video content
 */
export async function getLessonBySlug(
  moduleSlug: string,
  volumeSlug: string,
  lessonSlug: string,
  hasPlan?: boolean,
) {
  const cacheFn = cache(
    async (moduleSlug: string, volumeSlug: string, lessonSlug: string, hasPlan?: boolean) => {
      const payload = await getPayload()

      // Get the lesson
      const lessons = await payload.find({
        collection: LESSONS_SLUG,
        where: {
          slug: { equals: lessonSlug },
        },
        limit: 1,
      })

      if (lessons.docs.length === 0) return null
      const lesson = lessons.docs[0]!

      // Check access
      if (!hasLessonAccess(lesson, hasPlan) && !lesson.isPreview) {
        return {
          ...lesson,
          isAccessible: false,
          richText: undefined, // Hide content
          downloads: undefined, // Hide downloads
          videos: undefined, // Hide videos
        }
      }

      // Get associated videos if accessible
      let videos: Video[] = []
      if (lesson.videos && Array.isArray(lesson.videos)) {
        const videoIds = lesson.videos.map((v) => (typeof v === 'object' ? v.id : v))
        const videosResult = await payload.find({
          collection: VIDEOS_SLUG,
          where: {
            id: { in: videoIds },
          },
          limit: 100,
        })
        videos = videosResult.docs
      }

      return {
        ...lesson,
        videos,
        isAccessible: true,
      }
    },
    {
      tags: [CACHE_TAGS.GET_LAB_LESSONS_BY_SLUG + lessonSlug],
    },
  )

  return cacheFn(moduleSlug, volumeSlug, lessonSlug, hasPlan)
}

export async function getLessonById(lessonId: number) {
  const cacheFn = cache(
    async (lessonId: number) => {
      const payload = await getPayload()

      const lesson = await payload.find({
        collection: LESSONS_SLUG,
        where: { id: { equals: lessonId } },
        limit: 1,
      })

      return lesson.docs[0]
    },
    {
      tags: [CACHE_TAGS.GET_LAB_LESSONS_BY_ID + lessonId],
    },
  )

  return cacheFn(lessonId)
}

/**
 * Get lab statistics (publicly accessible)
 * Used for: Homepage stats display
 */
export async function getLabStats() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const [modules, volumes, lessons, videos] = await Promise.all([
        payload.find({ collection: 'modules', limit: 0 }),
        payload.find({ collection: 'volumes', limit: 0 }),
        payload.find({ collection: 'lessons', limit: 0 }),
        payload.find({ collection: 'videos', limit: 0 }),
      ])

      // Calculate estimated hours (rough estimate: 15 minutes per lesson)
      const estimatedHours = Math.ceil((lessons.totalDocs * 15) / 60)

      return {
        totalModules: modules.totalDocs,
        totalVolumes: volumes.totalDocs,
        totalLessons: lessons.totalDocs,
        totalVideos: videos.totalDocs,
        estimatedHours,
      }
    },
    {
      tags: [CACHE_TAGS.GET_LAB_STATS],
    },
  )
  return cacheFn()
}

/**
 * Calculate estimated completion time
 */
function calculateEstimatedTime(totalLessons: number): string {
  const estimatedMinutes = totalLessons * 15 // 15 minutes per lesson
  const hours = Math.floor(estimatedMinutes / 60)
  const minutes = estimatedMinutes % 60

  if (hours === 0) return `${minutes} minutes`
  if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${minutes}m`
}

/**
 * Get a volume by slug directly (without requiring module context)
 * Used for: Direct volume access via LabSections
 */
export async function getVolumeBySlugDirect(volumeSlug: string) {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const volumes = await payload.find({
        collection: VOLUMES_SLUG,
        where: {
          slug: {
            equals: volumeSlug,
          },
        },
        depth: 2, // Include module and lessons
        limit: 1,
      })

      return volumes.docs[0] || null
    },
    {
      tags: [CACHE_TAGS.GET_LAB_VOLUMES],
    },
  )

  return cacheFn()
}

/**
 * Get lesson by slug directly (without requiring module/volume context)
 * Used for: Direct lesson access via LabSections
 */
export async function getLessonBySlugDirect(lessonSlug: string) {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const lessons = await payload.find({
        collection: LESSONS_SLUG,
        where: {
          slug: {
            equals: lessonSlug,
          },
        },
        depth: 2, // Include module and volume relationships
        limit: 1,
      })

      return lessons.docs[0] || null
    },
    {
      tags: [CACHE_TAGS.GET_LAB_LESSONS],
    },
  )

  return cacheFn()
}

export async function getLessonCompletion(lessonId: number) {
  const user = await getCurrentUser()

  if (!user) return undefined

  const cacheFn = cache(
    async (lessonId: number, userId: number) => {
      const payload = await getPayload()

      const lesson = await payload.find({
        collection: PROGRESS_SLUG,
        where: {
          and: [{ lesson: { equals: lessonId } }, { user: { equals: userId } }],
        },
        limit: 1,
      })

      return lesson.docs[0]
    },
    {
      tags: [CACHE_TAGS.GET_LESSON_COMPLETION + lessonId + user.id],
    },
  )

  return cacheFn(lessonId, user.id)
}

export async function markLessonComplete(lessonId: number, completed: boolean) {
  const user = await getCurrentUser()

  if (!user) return false

  const payload = await getPayload()

  const progress = await getLessonCompletion(lessonId)

  if (progress) {
    await payload.update({
      collection: PROGRESS_SLUG,
      id: progress.id,
      data: { completed },
    })
  } else {
    await payload.create({
      collection: PROGRESS_SLUG,
      data: {
        lesson: lessonId,
        user: user.id,
        completed,
      },
    })
  }

  revalidateTag(CACHE_TAGS.GET_LESSON_COMPLETION + lessonId + user.id)

  return true
}

/**
 * Get all lab sections for organizing the lab page
 */
export async function getLabSections() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      const sections = await payload.find({
        collection: LAB_SECTIONS_SLUG,
        sort: 'order',
        depth: 2, // Include all related content
        limit: 100,
      })

      return sections.docs
    },
    {
      tags: [CACHE_TAGS.GET_LAB_SECTIONS],
    },
  )

  return cacheFn()
}

/**
 * Get content for a specific lab section with access control
 */
export async function getLabSectionContent(sectionId: number, userId?: number) {
  const cacheFn = cache(
    async (sectionId: number, userId?: number) => {
      const payload = await getPayload()

      const section = await payload.findByID({
        collection: LAB_SECTIONS_SLUG,
        id: sectionId,
        depth: 2,
      })

      if (!section) return null

      // Check user access for content filtering
      const hasPlan = userId ? await isEnrolledInAnyPlan(userId) : false

      // Process content based on type and access
      const processedContent = {
        ...section,
        modules:
          section.modules?.map((module: Module) => ({
            ...module,
            isAccessible: hasPlan,
          })) || [],
        volumes:
          section.volumes?.map((volume: Volume) => ({
            ...volume,
            isAccessible: hasPlan,
          })) || [],
        lessons:
          section.lessons?.map((lesson: Lesson) => ({
            ...lesson,
            isAccessible: hasLessonAccess(lesson, hasPlan),
          })) || [],
      }

      return processedContent
    },
    {
      tags: [CACHE_TAGS.GET_LAB_SECTIONS],
    },
  )

  return cacheFn(sectionId, userId)
}
