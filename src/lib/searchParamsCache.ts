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
  types: parseAsArrayOf(parseAsStringLiteral(['article', 'blueprint'] as const)).withDefault([]),
  page: parseAsInteger.withDefault(1),
  sort: parseAsStringLiteral(['newest', 'oldest', 'title', 'popular'] as const).withDefault(
    'newest',
  ),
  access: parseAsStringLiteral(['all', 'free', 'paid'] as const).withDefault('all'),
})

export type ResourcesSearchParams = ReturnType<typeof resourcesSearchParamsCache.parse>

export const mentorsSearchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  position: parseAsArrayOf(
    parseAsStringLiteral(['forward', 'defence', 'goalie'] as const),
  ).withDefault([]),
  levelOfPlay: parseAsArrayOf(parseAsStringLiteral(['d1', 'pro', 'usports'] as const)).withDefault(
    [],
  ),
  skills: parseAsArrayOf(parseAsString).withDefault([]),
  sports: parseAsArrayOf(
    parseAsStringLiteral(['hockey', 'soccer', 'baseball', 'basketball', 'volleyball'] as const),
  ).withDefault([]),
  featured: parseAsStringLiteral(['all', 'featured', 'regular'] as const).withDefault('all'),
  page: parseAsInteger.withDefault(1),
  sort: parseAsStringLiteral(['name', 'position', 'newest', 'oldest'] as const).withDefault('name'),
})

export type MentorsSearchParams = ReturnType<typeof mentorsSearchParamsCache.parse>
