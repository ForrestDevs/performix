import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/utilities/getPayload'
import { MENTOR_SLUG, ARTICLE_SLUG, BLUEPRINTS_SLUG, MODULES_SLUG, VOLUMES_SLUG, LESSONS_SLUG } from '@/payload/collections/constants'

const BASE_URL = 'https://www.performix.ca'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload()

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/mentors`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/plans`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lab`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/game-plan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Fetch dynamic content for sitemap
  const [mentors, articles, blueprints, modules] = await Promise.all([
    payload.find({
      collection: MENTOR_SLUG,
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    payload.find({
      collection: ARTICLE_SLUG,
      limit: 1000,
      depth: 0,
      where: {
        _status: { equals: 'published' },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    payload.find({
      collection: BLUEPRINTS_SLUG,
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    payload.find({
      collection: MODULES_SLUG,
      limit: 1000,
      depth: 0,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ])

  // Generate mentor pages
  const mentorPages: MetadataRoute.Sitemap = mentors.docs.map((mentor) => ({
    url: `${BASE_URL}/mentors/${mentor.slug}`,
    lastModified: new Date(mentor.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Generate article pages
  const articlePages: MetadataRoute.Sitemap = articles.docs.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Generate blueprint pages
  const blueprintPages: MetadataRoute.Sitemap = blueprints.docs.map((blueprint) => ({
    url: `${BASE_URL}/blueprints/${blueprint.slug}`,
    lastModified: new Date(blueprint.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Generate lab module pages
  const modulePages: MetadataRoute.Sitemap = modules.docs.map((module) => ({
    url: `${BASE_URL}/lab/module/${module.slug}`,
    lastModified: new Date(module.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...mentorPages,
    ...articlePages,
    ...blueprintPages,
    ...modulePages,
  ]
}
