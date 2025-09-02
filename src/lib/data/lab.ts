'use server'

import { revalidateTag } from 'next/cache'
import { getPayload } from '../utilities/getPayload'
import { Video } from '@/payload-types'
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
import { getCurrentUser } from './auth'
import { hasLessonAccess } from '../utilities/hasLessonAccess'
import { getMediaById } from './media'
import { isEnrolledInAnyPlan } from './plans'

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

export async function getModuleCompletion(moduleId: number) {
  const user = await getCurrentUser()

  if (!user) return undefined

  const labModule = await getModuleById(moduleId)

  if (!labModule) return undefined

  const lessons = labModule.lessons?.docs ?? []

  const lessonIds = lessons.map((lesson) => (typeof lesson === 'object' ? lesson.id : lesson))

  const cacheFn = cache(
    async (userId: number) => {
      const payload = await getPayload()

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
      tags: (userId: number) => [CACHE_TAGS.GET_LAB_PROGRESS + userId],
    },
  )

  return cacheFn(user.id)
}

export async function getVolumeCompletion(volumeId: number) {
  const user = await getCurrentUser()

  if (!user) return undefined

  const volume = await getVolumeById(volumeId)

  if (!volume) return undefined

  const lessons = volume.lessons?.docs ?? []

  const lessonIds = lessons.map((lesson) => (typeof lesson === 'object' ? lesson.id : lesson))

  const cacheFn = cache(
    async (userId: number) => {
      const payload = await getPayload()

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
      tags: (userId: number) => [CACHE_TAGS.GET_LAB_PROGRESS + userId],
    },
    [lessonIds.join(',')],
  )

  return cacheFn(user.id)
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
      tags: [CACHE_TAGS.GET_LAB_LESSON_COMPLETION + lessonId + user.id],
    },
  )

  return cacheFn(lessonId, user.id)
}

/**
 * Get a specific module with its volumes (publicly accessible)
 * Used for: Module detail pages showing volume structure
 */
export async function getModuleBySlug(slug: string) {
  const cacheFn = cache(
    async (slug: string) => {
      const payload = await getPayload()

      const modules = await payload.find({
        collection: MODULES_SLUG,
        where: {
          slug: { equals: slug },
        },
        limit: 1,
        depth: 4,
      })

      if (modules.docs.length === 0) return null

      return modules.docs[0]
    },
    {
      tags: (slug: string) => [CACHE_TAGS.GET_LAB_MODULE_BY_SLUG + slug],
    },
  )

  return cacheFn(slug)
}

export async function getModuleById(moduleId: number) {
  const moduleCache = cache(
    async (moduleId: number) => {
      const payload = await getPayload()

      const modules = await payload.find({
        collection: MODULES_SLUG,
        where: { id: { equals: moduleId } },
        select: {
          slug: true,
          title: true,
          subtitle: true,
          thumbnail: true,
          order: true,
          topics: true,
          volumes: true,
          lessons: true,
        },
        sort: 'order',
        depth: 0,
        limit: 1,
      })

      return modules.docs[0]
    },
    {
      tags: (moduleId: number) => [CACHE_TAGS.GET_LAB_MODULE_BY_ID + moduleId],
    },
  )

  const labModule = await moduleCache(moduleId)

  if (!labModule) return undefined

  const labModuleThumbnailId =
    typeof labModule.thumbnail === 'object' ? labModule.thumbnail?.id : labModule.thumbnail

  const labModuleThumbnail = await getMediaById(labModuleThumbnailId)

  return {
    ...labModule,
    thumbnail: labModuleThumbnail,
  }
}

/**
 * Get a specific volume with its lessons (publicly accessible for structure, content access controlled)
 * Used for: Volume detail pages showing lesson list
 */
export async function getVolumeBySlug(volumeSlug: string) {
  const cacheFn = cache(
    async (volumeSlug: string) => {
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
      tags: (volumeSlug: string) => [CACHE_TAGS.GET_LAB_VOLUME_BY_SLUG + volumeSlug],
    },
  )
  return cacheFn(volumeSlug)
}

export async function getVolumeById(volumeId: number) {
  const volumeCache = cache(
    async (volumeId: number) => {
      const payload = await getPayload()

      const volume = await payload.find({
        collection: VOLUMES_SLUG,
        where: { id: { equals: volumeId } },
        select: {
          slug: true,
          title: true,
          subtitle: true,
          thumbnail: true,
          order: true,
          lessons: true,
          topics: true,
        },
        sort: 'order',
        depth: 0,
        limit: 1,
      })

      return volume.docs[0]
    },
    {
      tags: (volumeId: number) => [CACHE_TAGS.GET_LAB_VOLUME_BY_ID + volumeId],
    },
  )

  const labVolume = await volumeCache(volumeId)

  if (!labVolume) return undefined

  const labVolumeThumbnailId =
    typeof labVolume.thumbnail === 'object' ? labVolume.thumbnail?.id : labVolume.thumbnail

  const labVolumeThumbnail = await getMediaById(labVolumeThumbnailId)

  return {
    ...labVolume,
    thumbnail: labVolumeThumbnail,
  }
}

/**
 * Get a specific lesson with full content (access controlled)
 * Used for: Lesson detail pages with video content
 */
export async function getLessonBySlug(lessonSlug: string, userId?: number) {
  const cacheFn = cache(
    async (lessonSlug: string, userId?: number) => {
      const payload = await getPayload()

      const hasPlan = userId ? await isEnrolledInAnyPlan(userId) : false

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
        console.log('lesson not accessible becuase of insufficient access: ', lesson.slug)
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
      tags: (lessonSlug: string, userId?: number) => [
        CACHE_TAGS.GET_LAB_LESSON_BY_SLUG + lessonSlug + userId,
      ],
    },
  )

  return cacheFn(lessonSlug, userId)
}

export async function getLessonMetadataBySlug(lessonSlug: string) {
  const cacheFn = cache(
    async (lessonSlug: string) => {
      const payload = await getPayload()

      const lesson = await payload.find({
        collection: LESSONS_SLUG,
        where: { slug: { equals: lessonSlug } },
        select: {
          title: true,
          subtitle: true,
          isPreview: true,
        },
        limit: 1,
      })

      return lesson.docs[0]
    },
    {
      tags: (lessonSlug: string) => [CACHE_TAGS.GET_LAB_LESSON_BY_SLUG + lessonSlug],
    },
  )

  return cacheFn(lessonSlug)
}

export async function getLessonById(lessonId: number) {
  const cacheFn = cache(
    async (lessonId: number) => {
      const payload = await getPayload()

      const lesson = await payload.find({
        collection: LESSONS_SLUG,
        where: { id: { equals: lessonId } },
        select: {
          slug: true,
          title: true,
          subtitle: true,
          order: true,
          videos: true,
          downloads: true,
          isPreview: true,
        },
        depth: 0,
        sort: 'order',
        limit: 1,
      })

      return lesson.docs[0]
    },
    {
      tags: (lessonId: number) => [CACHE_TAGS.GET_LAB_LESSON_BY_ID + lessonId],
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
        payload.count({ collection: 'modules' }),
        payload.count({ collection: 'volumes' }),
        payload.count({ collection: 'lessons' }),
        payload.count({ collection: 'videos' }),
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

  revalidateTag(CACHE_TAGS.GET_LAB_LESSON_COMPLETION + lessonId + user.id)

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
        depth: 0,
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

export async function getLabSection(sectionId: number) {
  const cacheFn = cache(
    async (sectionId: number) => {
      const payload = await getPayload()

      const section = await payload.findByID({
        collection: LAB_SECTIONS_SLUG,
        id: sectionId,
        depth: 1,
      })

      return section
    },
    {
      tags: (sectionId: number) => [CACHE_TAGS.GET_LAB_SECTION_BY_ID + sectionId],
    },
  )

  return cacheFn(sectionId)
}
