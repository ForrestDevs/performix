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
      tags: (slug: string) => [CACHE_TAGS.GET_LAB_MODULES_BY_SLUG + slug],
    },
  )

  return cacheFn(slug)
}

export async function getModulesByIds(moduleIds: number[]) {
  if (moduleIds.length === 0) return []
  const cacheFn = cache(
    async (moduleIds: number[]) => {
      const payload = await getPayload()

      const modules = await payload.find({
        collection: MODULES_SLUG,
        where: { id: { in: moduleIds } },
        limit: 100,
      })

      return modules.docs
    },
    {
      tags: (moduleIds: number[]) => moduleIds.map((id) => CACHE_TAGS.GET_LAB_MODULES_BY_ID + id),
    },
  )

  return cacheFn(moduleIds)
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
      tags: (volumeSlug: string) => [CACHE_TAGS.GET_LAB_VOLUMES_BY_SLUG + volumeSlug],
    },
  )
  return cacheFn(volumeSlug)
}

export async function getVolumesByIds(volumeIds: number[]) {
  if (volumeIds.length === 0) return []
  const cacheFn = cache(
    async (volumeIds: number[]) => {
      const payload = await getPayload()

      const volumes = await payload.find({
        collection: VOLUMES_SLUG,
        where: { id: { in: volumeIds } },
        limit: 100,
      })

      return volumes.docs
    },
    {
      tags: (volumeIds: number[]) => volumeIds.map((id) => CACHE_TAGS.GET_LAB_VOLUMES_BY_ID + id),
    },
  )

  return cacheFn(volumeIds)
}

/**
 * Get a specific lesson with full content (access controlled)
 * Used for: Lesson detail pages with video content
 */
export async function getLessonBySlug(lessonSlug: string, hasPlan?: boolean) {
  const cacheFn = cache(
    async (lessonSlug: string, hasPlan?: boolean) => {
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
      tags: (lessonSlug: string) => [CACHE_TAGS.GET_LAB_LESSONS_BY_SLUG + lessonSlug],
    },
  )

  return cacheFn(lessonSlug, hasPlan)
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
      tags: (lessonId: number) => [CACHE_TAGS.GET_LAB_LESSONS_BY_ID + lessonId],
    },
  )

  return cacheFn(lessonId)
}

export async function getLessonsByIds(lessonIds: number[]) {
  if (lessonIds.length === 0) return []
  const cacheFn = cache(
    async (lessonIds: number[]) => {
      const payload = await getPayload()

      const lessons = await payload.find({
        collection: LESSONS_SLUG,
        where: { id: { in: lessonIds } },
        limit: 100,
      })

      return lessons.docs
    },
    {
      tags: (lessonIds: number[]) => lessonIds.map((id) => CACHE_TAGS.GET_LAB_LESSONS_BY_ID + id),
    },
  )

  return cacheFn(lessonIds)
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
 * Get a volume by slug directly (without requiring module context)
 * Used for: Direct volume access via LabSections
 */
export async function getVolumeBySlugDirect(volumeSlug: string) {
  const cacheFn = cache(
    async (volumeSlug: string) => {
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
      tags: (volumeSlug: string) => [CACHE_TAGS.GET_LAB_VOLUMES_BY_SLUG + volumeSlug],
    },
  )

  return cacheFn(volumeSlug)
}

/**
 * Get lesson by slug directly (without requiring module/volume context)
 * Used for: Direct lesson access via LabSections
 */
export async function getLessonBySlugDirect(lessonSlug: string) {
  const cacheFn = cache(
    async (lessonSlug: string) => {
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
      tags: (lessonSlug: string) => [CACHE_TAGS.GET_LAB_LESSONS_BY_SLUG + lessonSlug],
    },
  )

  return cacheFn(lessonSlug)
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
        depth: 1, // Include all related content
        select: {
          title: true,
          subtitle: true,
          order: true,
        },
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
      tags: (sectionId: number) => [CACHE_TAGS.GET_LAB_SECTION + sectionId],
    },
  )

  return cacheFn(sectionId)
}

/**
 * Get content for a specific lab section with access control
 */
export async function getLabSectionContent(sectionId: number) {
  const cacheFn = cache(
    async (sectionId: number) => {
      const section = await getLabSection(sectionId)
      if (!section) return null

      const moduleIds =
        section.modules?.map((module) => (typeof module === 'object' ? module.id : module)) || []
      const volumeIds =
        section.volumes?.map((volume) => (typeof volume === 'object' ? volume.id : volume)) || []
      const lessonIds =
        section.lessons?.map((lesson) => (typeof lesson === 'object' ? lesson.id : lesson)) || []

      let modules: Module[] = []
      let volumes: Volume[] = []
      let lessons: Lesson[] = []

      switch (section.contentType) {
        case 'modules':
          if (section.modules?.length === 0) break
          modules = await getModulesByIds(moduleIds)
        case 'volumes':
          if (section.volumes?.length === 0) break
          volumes = await getVolumesByIds(volumeIds)
        case 'lessons':
          if (section.lessons?.length === 0) break
          lessons = await getLessonsByIds(lessonIds)
        case 'mixed':
          if (section.modules?.length === 0) break
          if (section.volumes?.length === 0) break
          if (section.lessons?.length === 0) break
          const res: [Module[], Volume[], Lesson[]] = await Promise.all([
            getModulesByIds(moduleIds),
            getVolumesByIds(volumeIds),
            getLessonsByIds(lessonIds),
          ])
          modules = res[0]
          volumes = res[1]
          lessons = res[2]
      }

      const content = {
        ...section,
        modules,
        volumes,
        lessons,
      }

      return content
    },
    {
      tags: (sectionId: number) => [CACHE_TAGS.GET_LAB_SECTION_CONTENT + sectionId],
    },
  )

  return cacheFn(sectionId)
}
