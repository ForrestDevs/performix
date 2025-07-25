import { getPayload } from '@/lib/utilities/getPayload'
import {
  ARTICLE_SLUG,
  BLUEPRINTS_SLUG,
  COURSES_SLUG,
  ARTICLE_TAG_SLUG,
} from '@/payload/collections/constants'
import type { Article, Blueprint, ArticleTag } from '@/payload-types'
import type {
  GetResourcesParams,
  GetResourcesResult,
  Resource,
  ResourceType,
} from '../types/resources'

export async function getResources({
  search = '',
  tags = [],
  types = [],
  access = 'all',
  page = 1,
  limit = 12,
  sort = 'newest',
}: GetResourcesParams): Promise<GetResourcesResult> {
  const payload = await getPayload()

  // If no types specified, include all
  const targetTypes = types.length > 0 ? types : ['article', 'blueprint', 'course']

  // Build tag IDs for filtering
  let tagIds: number[] = []
  if (tags.length > 0) {
    try {
      const tagResult = await payload.find({
        collection: ARTICLE_TAG_SLUG,
        where: {
          or: [
            { slug: { in: tags } },
            { id: { in: tags.filter((tag) => !isNaN(Number(tag))).map(Number) } },
          ],
        },
        limit: 100,
      })
      tagIds = tagResult.docs.map((tag) => tag.id)
    } catch (error) {
      console.error('Error fetching tag IDs:', error)
    }
  }

  // Fetch data from all collections in parallel
  const [articlesData, blueprintsData] = await Promise.all([
    targetTypes.includes('article')
      ? fetchArticles(payload, { search, tagIds, access })
      : Promise.resolve([]),
    targetTypes.includes('blueprint')
      ? fetchBlueprints(payload, { search, access })
      : Promise.resolve([]),
  ])

  // Transform to unified format
  const unifiedResources: Resource[] = [
    ...articlesData.map(transformArticle),
    ...blueprintsData.map(transformBlueprint),
  ]

  // Apply sorting
  const sortedResources = sortResources(unifiedResources, sort)

  // Calculate counts
  const counts = {
    total: unifiedResources.length,
    articles: articlesData.length,
    blueprints: blueprintsData.length,
    free: unifiedResources.filter((r) => !r.isPaid).length,
    paid: unifiedResources.filter((r) => r.isPaid).length,
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedResources = sortedResources.slice(startIndex, endIndex)

  return {
    resources: paginatedResources,
    totalCount: unifiedResources.length,
    totalPages: Math.ceil(unifiedResources.length / limit),
    currentPage: page,
    pageSize: limit,
    counts,
  }
}

async function fetchArticles(payload: any, { search, tagIds, access }: any): Promise<Article[]> {
  const whereConditions: any[] = [{ _status: { equals: 'published' } }]

  if (search) {
    whereConditions.push({
      or: [{ title: { contains: search } }, { 'meta.description': { contains: search } }],
    })
  }

  if (tagIds.length > 0) {
    whereConditions.push({ tags: { in: tagIds } })
  }

  try {
    const result = await payload.find({
      collection: ARTICLE_SLUG,
      where: { and: whereConditions },
      depth: 3,
      limit: 1000, // Get all for sorting
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

async function fetchBlueprints(payload: any, { search, access }: any): Promise<Blueprint[]> {
  const whereConditions: any[] = []

  if (search) {
    whereConditions.push({
      or: [{ title: { contains: search } }, { description: { contains: search } }],
    })
  }

  if (access === 'free') {
    whereConditions.push({ isPaid: { equals: false } })
  } else if (access === 'paid') {
    whereConditions.push({ isPaid: { equals: true } })
  }

  try {
    const result = await payload.find({
      collection: BLUEPRINTS_SLUG,
      where: whereConditions.length > 0 ? { and: whereConditions } : {},
      depth: 2,
      limit: 1000,
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching blueprints:', error)
    return []
  }
}

function transformArticle(article: Article): Resource {
  return {
    id: article.id.toString(),
    type: 'article',
    title: article.title,
    description: article.meta?.description || '',
    thumbnail: article.meta?.image || undefined,
    slug: article.slug || '',
    publishedAt: article.publishedAt || '',
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    tags: Array.isArray(article.tags)
      ? article.tags
          .map((tag) => (typeof tag === 'object' ? tag.title : String(tag)))
          .filter(Boolean)
      : [],
    isPaid: false, // Articles are typically free
    url: `/articles/${article.slug}`,
    readTime: calculateReadTime(article.content),
    originalData: article,
  }
}

function transformBlueprint(blueprint: Blueprint): Resource {
  return {
    id: blueprint.id.toString(),
    type: 'blueprint',
    title: blueprint.title || '',
    description: blueprint.description || '',
    thumbnail: blueprint.thumbnail || undefined,
    slug: blueprint.slug || '',
    createdAt: blueprint.createdAt,
    updatedAt: blueprint.updatedAt,
    tags: [], // Blueprints don't have tags in current schema
    isPaid: blueprint.isPaid || false,
    price: blueprint.price || 0,
    url: `/blueprints/${blueprint.slug}`,
    originalData: blueprint,
  }
}

function calculateReadTime(content: any): number {
  if (!content) return 1
  const text = JSON.stringify(content)
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

function sortResources(resources: Resource[], sort: string): Resource[] {
  switch (sort) {
    case 'oldest':
      return resources.sort(
        (a, b) =>
          new Date(a.publishedAt || a.createdAt).getTime() -
          new Date(b.publishedAt || b.createdAt).getTime(),
      )
    case 'title':
      return resources.sort((a, b) => a.title.localeCompare(b.title))
    case 'popular':
      // For now, sort by newest as we don't have view counts
      // TODO: Implement actual popularity metrics
      return resources.sort(
        (a, b) =>
          new Date(b.publishedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.createdAt).getTime(),
      )
    case 'newest':
    default:
      return resources.sort(
        (a, b) =>
          new Date(b.publishedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.createdAt).getTime(),
      )
  }
}

export async function getResourcesTags(): Promise<ArticleTag[]> {
  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: ARTICLE_TAG_SLUG,
      sort: 'title',
      limit: 100,
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching resource tags:', error)
    return []
  }
}
