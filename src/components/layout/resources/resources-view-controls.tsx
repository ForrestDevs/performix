'use client'

import { useTransition } from 'react'
import { useQueryState, parseAsStringLiteral } from 'nuqs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Grid3X3, List } from 'lucide-react'

interface ResourcesViewControlsProps {
  totalCount: number
  sortOptions?: Array<{ value: string; label: string }>
}

const VIEW_MODES = ['grid', 'list'] as const
const SORT_OPTIONS = [
  { value: 'newest', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
] as const

export default function ResourcesViewControls({
  totalCount,
  sortOptions = SORT_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label })),
}: ResourcesViewControlsProps) {
  const [isPending, startTransition] = useTransition()

  const [viewMode, setViewMode] = useQueryState(
    'view',
    parseAsStringLiteral(VIEW_MODES).withDefault('grid').withOptions({
      shallow: true, // View mode change doesn't need server update
    }),
  )

  const [sortBy, setSortBy] = useQueryState(
    'sort',
    parseAsStringLiteral(sortOptions.map((opt) => opt.value) as readonly string[])
      .withDefault('newest')
      .withOptions({
        shallow: false,
        startTransition,
      }),
  )

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
        <Badge variant="outline" className="text-[#0891B2] border-[#0891B2]">
          {totalCount} articles
        </Badge>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-[#0891B2] text-white' : ''}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#0891B2] text-white' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          disabled={isPending}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0891B2] focus:outline-none disabled:opacity-50"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
