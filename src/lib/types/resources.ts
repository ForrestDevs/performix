import { Article, Blueprint, Media } from '@/payload-types'

export type ResourceType = 'article' | 'blueprint'

export interface Resource {
  id: string
  type: ResourceType
  title: string
  description?: string
  thumbnail?: Media | number
  slug: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  tags?: string[]
  isPaid: boolean
  price?: number
  url: string
  readTime?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  originalData: Article | Blueprint
}

export interface GetResourcesParams {
  search?: string
  tags?: string[]
  types?: ResourceType[]
  access?: 'all' | 'free' | 'paid'
  page?: number
  limit?: number
  sort?: 'newest' | 'oldest' | 'title' | 'popular'
}

export interface GetResourcesResult {
  resources: Resource[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
  counts: {
    total: number
    articles: number
    blueprints: number
    free: number
    paid: number
  }
}
