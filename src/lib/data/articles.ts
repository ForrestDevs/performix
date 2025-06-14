import { getPayload } from '@/lib/utilities/getPayload'
import { ARTICLE_SLUG, ARTICLE_TAG_SLUG } from '@/payload/collections/constants'
import type { Article, ArticleTag } from '@/payload-types'

interface GetArticlesParams {
  search?: string
  tags?: string[]
  page?: number
  limit?: number
  sort?: 'newest' | 'oldest' | 'title'
}

interface GetArticlesResult {
  articles: Article[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export async function getArticles({
  search = '',
  tags = [],
  page = 1,
  limit = 12,
  sort = 'newest',
}: GetArticlesParams): Promise<GetArticlesResult> {
  const payload = await getPayload()

  // Build the where clause
  const whereConditions: any[] = [
    {
      _status: {
        equals: 'published',
      },
    },
  ]

  // Add search condition
  if (search) {
    whereConditions.push({
      or: [
        {
          title: {
            contains: search,
          },
        },
        {
          'meta.description': {
            contains: search,
          },
        },
      ],
    })
  }

  // Add tag filtering - need to handle both slug and ID
  if (tags.length > 0) {
    // First, get tag IDs from slugs if they are slugs
    const tagIds: number[] = []
    const tagSlugs: string[] = []

    for (const tag of tags) {
      if (isNaN(Number(tag))) {
        tagSlugs.push(tag)
      } else {
        tagIds.push(Number(tag))
      }
    }

    // Get tag IDs from slugs
    if (tagSlugs.length > 0) {
      try {
        const tagResult = await payload.find({
          collection: ARTICLE_TAG_SLUG,
          where: {
            slug: {
              in: tagSlugs,
            },
          },
          limit: 100,
        })
        tagIds.push(...tagResult.docs.map((tag) => tag.id))
      } catch (error) {
        console.error('Error fetching tag IDs:', error)
      }
    }

    if (tagIds.length > 0) {
      whereConditions.push({
        tags: {
          in: tagIds,
        },
      })
    }
  }

  // Build sort configuration
  let sortConfig: any = '-publishedAt' // Default: newest first
  switch (sort) {
    case 'oldest':
      sortConfig = 'publishedAt'
      break
    case 'title':
      sortConfig = 'title'
      break
    case 'newest':
    default:
      sortConfig = '-publishedAt'
      break
  }

  try {
    const result = await payload.find({
      collection: ARTICLE_SLUG,
      where: {
        and: whereConditions,
      },
      sort: sortConfig,
      limit,
      page,
      depth: 3, // Increased depth to ensure media and tag relations are populated
    })

    return {
      articles: result.docs,
      totalCount: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page || 1,
      pageSize: result.limit,
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return {
      articles: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: limit,
    }
  }
}

export async function getArticleTags(): Promise<ArticleTag[]> {
  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: ARTICLE_TAG_SLUG,
      sort: 'title',
      limit: 100, // Assuming we won't have more than 100 tags
    })

    return result.docs
  } catch (error) {
    console.error('Error fetching article tags:', error)
    return []
  }
}
