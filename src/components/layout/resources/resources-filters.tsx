'use client'

import { useTransition } from 'react'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import type { ArticleTag } from '@/payload-types'

interface ResourcesFiltersProps {
  tags: ArticleTag[]
  className?: string
}

export default function ResourcesFilters({ tags, className }: ResourcesFiltersProps) {
  const [isPending, startTransition] = useTransition()
  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false,
      startTransition,
    }),
  )

  const handleTagToggle = (tagSlug: string) => {
    const isSelected = selectedTags.includes(tagSlug)
    if (isSelected) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagSlug))
    } else {
      setSelectedTags([...selectedTags, tagSlug])
    }
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  return (
    <div className={className} data-pending={isPending ? '' : undefined}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter by Tags</h3>
          {selectedTags.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-[#0891B2] transition-colors duration-200"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag.slug || tag.id.toString())
            return (
              <Badge
                key={tag.id}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'bg-[#0891B2] text-white border-[#0891B2] hover:bg-[#0E7490]'
                    : 'hover:border-[#0891B2] hover:text-[#0891B2]'
                }`}
                onClick={() => handleTagToggle(tag.slug || tag.id.toString())}
              >
                {tag.title}
                {isSelected && <X className="h-3 w-3 ml-1" />}
              </Badge>
            )
          })}
        </div>

        {selectedTags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tagSlug) => {
                const tag = tags.find((t) => (t.slug || t.id.toString()) === tagSlug)
                return tag ? (
                  <Badge
                    key={tagSlug}
                    variant="secondary"
                    className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => handleTagToggle(tagSlug)}
                  >
                    {tag.title}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
