import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  createSerializer,
} from 'nuqs/server'

export type SortOption = 'title' | '-createdAt'

export const SORT_OPTIONS = ['title', '-createdAt'] as const
export const LIMIT_OPTIONS = [12, 24, 48, 96] as const
export const POSITION_OPTIONS = ['Forward', 'Defense', 'Goalie'] as const

export const filterParsers = {
  // Sorting
  sort: parseAsStringLiteral(SORT_OPTIONS)
    .withDefault('title' as SortOption)
    .withOptions({ clearOnDefault: true }),

  // Search query
  q: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),

  // Pagination
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  limit: parseAsInteger.withDefault(LIMIT_OPTIONS[0]).withOptions({ clearOnDefault: true }),
}

export const browseMentorsParamsCache = createSearchParamsCache({})
