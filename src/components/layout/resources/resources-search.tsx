'use client'

import { useState, useTransition } from 'react'
import { useQueryState, parseAsString } from 'nuqs'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ResourcesSearchProps {
  onShowFilters?: (show: boolean) => void
  showFilters?: boolean
}

export default function ResourcesSearch({ onShowFilters, showFilters }: ResourcesSearchProps) {
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      startTransition,
      throttleMs: 300, // Debounce search input
    }),
  )

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles, guides, and resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value || null)}
          className="pl-12 pr-16 py-4 text-lg border-2 border-gray-200 focus:border-[#0891B2] rounded-xl transition-all duration-300"
          disabled={isPending}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShowFilters?.(!showFilters)}
            className="text-gray-500 hover:text-[#0891B2]"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {isPending && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0891B2]"></div>
          </div>
        )}
      </div>
    </div>
  )
}
