import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringLiteral,
} from 'nuqs/server'

export const resourcesSearchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
  page: parseAsInteger.withDefault(1),
  view: parseAsStringLiteral(['grid', 'list'] as const).withDefault('grid'),
  sort: parseAsStringLiteral(['newest', 'oldest', 'title'] as const).withDefault('newest'),
})

export type ResourcesSearchParams = ReturnType<typeof resourcesSearchParamsCache.parse>
