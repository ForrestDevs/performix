import { cache } from '../utilities/cache'
import { getPayload } from '../utilities/getPayload'
import { MENTOR_SLUG } from '@/payload/collections/constants'
import { Mentor } from '@/payload-types'
import { MentorsSearchParams } from '../searchParamsCache'

export interface MentorFilters {
  search?: string
  position?: string[]
  levelOfPlay?: string[]
  skills?: string[]
  sports?: string[]
  featured?: 'all' | 'featured' | 'regular'
  sort?: 'name' | 'position' | 'newest' | 'oldest'
  page?: number
  limit?: number
}

export interface MentorsResponse {
  mentors: Mentor[]
  totalCount: number
  hasMore: boolean
  currentPage: number
  totalPages: number
  filters: {
    positions: Array<{ value: string; count: number }>
    levelOfPlay: Array<{ value: string; count: number }>
    skills: Array<{ value: string; count: number }>
    sports: Array<{ value: string; count: number }>
  }
}

export async function getFeaturedMentors() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const mentors = await payload.find({
        collection: MENTOR_SLUG,
        where: { featured: { equals: true } },
        limit: 4,
        depth: 3,
      })

      return mentors.docs
    },
    {
      tags: ['get-featured-mentors'],
    },
    [],
  )

  return cacheFn()
}

export async function getMentors() {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const mentors = await payload.find({
        collection: MENTOR_SLUG,
        depth: 3,
        limit: 100,
      })

      return mentors.docs
    },
    {
      tags: ['get-mentors'],
    },
    [],
  )

  return cacheFn()
}

export async function getMentorsWithFilters(params: MentorFilters): Promise<MentorsResponse> {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()

      // Set defaults for arrays and page
      const {
        search = '',
        position = [],
        levelOfPlay = [],
        skills = [],
        sports = [],
        featured = 'all',
        sort = 'name',
        page = 1,
        limit = 12,
      } = params

      // Get all mentors for filtering counts
      const allMentors = await payload.find({
        collection: MENTOR_SLUG,
        depth: 3,
        limit: 1000, // Get all mentors for proper filtering
      })

      let filteredMentors = [...allMentors.docs]

      // Apply search filter
      if (search) {
        const searchTerm = search.toLowerCase()
        filteredMentors = filteredMentors.filter((mentor) => {
          return (
            mentor.name?.toLowerCase().includes(searchTerm) ||
            mentor.bio?.toLowerCase().includes(searchTerm) ||
            mentor.intro?.toLowerCase().includes(searchTerm) ||
            mentor.location?.toLowerCase().includes(searchTerm) ||
            mentor.currentTeam?.toLowerCase().includes(searchTerm) ||
            mentor.skills?.some((skill) => skill.toLowerCase().includes(searchTerm)) ||
            // @ts-ignore - accessing school name if it's populated
            mentor.school?.name?.toLowerCase().includes(searchTerm)
          )
        })
      }

      // Apply position filter
      if (position.length > 0) {
        filteredMentors = filteredMentors.filter((mentor) =>
          mentor.position ? position.includes(mentor.position) : false,
        )
      }

      // Apply level of play filter
      if (levelOfPlay.length > 0) {
        filteredMentors = filteredMentors.filter((mentor) =>
          mentor.levelOfPlay ? levelOfPlay.includes(mentor.levelOfPlay) : false,
        )
      }

      // Apply skills filter
      if (skills.length > 0) {
        filteredMentors = filteredMentors.filter((mentor) =>
          mentor.skills?.some((skill) => skills.includes(skill)),
        )
      }

      // Apply sports filter
      if (sports.length > 0) {
        filteredMentors = filteredMentors.filter((mentor) =>
          mentor.sports?.some((sport) => sports.includes(sport)),
        )
      }

      // Apply featured filter
      if (featured === 'featured') {
        filteredMentors = filteredMentors.filter((mentor) => mentor.featured === true)
      } else if (featured === 'regular') {
        filteredMentors = filteredMentors.filter((mentor) => mentor.featured !== true)
      }

      // Apply sorting
      const sortedMentors = [...filteredMentors].sort((a, b) => {
        switch (sort) {
          case 'name':
            return (a.name || '').localeCompare(b.name || '')
          case 'position':
            return (a.position || '').localeCompare(b.position || '')
          case 'newest':
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          case 'oldest':
            return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
          default:
            return (a.name || '').localeCompare(b.name || '')
        }
      })

      // Pagination
      const totalCount = sortedMentors.length
      const totalPages = Math.ceil(totalCount / limit)
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedMentors = sortedMentors.slice(startIndex, endIndex)

      // Generate filter counts for UI
      const getFilterCounts = () => {
        const positions: { [key: string]: number } = {}
        const levelOfPlay: { [key: string]: number } = {}
        const skills: { [key: string]: number } = {}
        const sports: { [key: string]: number } = {}

        allMentors.docs.forEach((mentor) => {
          // Position counts
          if (mentor.position) {
            positions[mentor.position] = (positions[mentor.position] || 0) + 1
          }

          // Level of play counts
          if (mentor.levelOfPlay) {
            levelOfPlay[mentor.levelOfPlay] = (levelOfPlay[mentor.levelOfPlay] || 0) + 1
          }

          // Skills counts
          mentor.skills?.forEach((skill) => {
            skills[skill] = (skills[skill] || 0) + 1
          })

          // Sports counts
          mentor.sports?.forEach((sport) => {
            sports[sport] = (sports[sport] || 0) + 1
          })
        })

        return {
          positions: Object.entries(positions).map(([value, count]) => ({ value, count })),
          levelOfPlay: Object.entries(levelOfPlay).map(([value, count]) => ({ value, count })),
          skills: Object.entries(skills)
            .map(([value, count]) => ({ value, count }))
            .sort((a, b) => b.count - a.count), // Sort by count
          sports: Object.entries(sports).map(([value, count]) => ({ value, count })),
        }
      }

      return {
        mentors: paginatedMentors,
        totalCount,
        hasMore: page < totalPages,
        currentPage: page,
        totalPages,
        filters: getFilterCounts(),
      }
    },
    {
      tags: ['get-mentors-filtered'],
    },
    [JSON.stringify(params)],
  )

  return cacheFn()
}

export async function getMentor(slug: string) {
  const cacheFn = cache(
    async () => {
      const payload = await getPayload()
      const mentor = await payload.find({
        collection: MENTOR_SLUG,
        where: {
          slug: { equals: slug },
        },
      })
      return mentor.docs[0]
    },
    {
      tags: [`get-mentor-${slug}`],
    },
    [slug],
  )

  return cacheFn()
}
