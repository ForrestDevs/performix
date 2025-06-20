'use client'

import { useTransition, useState } from 'react'
import { useQueryState, parseAsArrayOf, parseAsString, parseAsStringLiteral } from 'nuqs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { X, Filter, FileText, Download, PlayCircle, Star, DollarSign, Shield } from 'lucide-react'
import type { ArticleTag } from '@/payload-types'
import type { ResourceType } from '@/lib/data/resources'
import { cn } from '@/lib/utilities/ui'

interface EnhancedResourcesFiltersProps {
  tags: ArticleTag[]
  counts?: {
    total: number
    articles: number
    blueprints: number
    courses: number
    free: number
    paid: number
  }
  className?: string
  isMobile?: boolean
}

export default function EnhancedResourcesFilters({
  tags,
  counts,
  className,
  isMobile = false,
}: EnhancedResourcesFiltersProps) {
  const [isPending, startTransition] = useTransition()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const [selectedTags, setSelectedTags] = useQueryState(
    'tags',
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false,
      startTransition,
    }),
  )

  const [selectedTypes, setSelectedTypes] = useQueryState(
    'types',
    parseAsArrayOf(parseAsStringLiteral(['article', 'blueprint', 'course'] as const))
      .withDefault([])
      .withOptions({
        shallow: false,
        startTransition,
      }),
  )

  const [selectedAccess, setSelectedAccess] = useQueryState(
    'access',
    parseAsStringLiteral(['all', 'free', 'paid'] as const)
      .withDefault('all')
      .withOptions({
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

  const handleTypeToggle = (type: ResourceType) => {
    const isSelected = selectedTypes.includes(type)
    if (isSelected) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSelectedTypes([])
    setSelectedAccess('all')
  }

  const activeFiltersCount =
    selectedTags.length + selectedTypes.length + (selectedAccess !== 'all' ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6" data-pending={isPending ? '' : undefined}>
      {/* Resource Types */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Resource Type</h3>
        <div className="space-y-3">
          {[
            {
              type: 'article' as const,
              label: 'Articles',
              icon: FileText,
              count: counts?.articles,
            },
            {
              type: 'blueprint' as const,
              label: 'Blueprints',
              icon: Download,
              count: counts?.blueprints,
            },
            { type: 'course' as const, label: 'Courses', icon: PlayCircle, count: counts?.courses },
          ].map(({ type, label, icon: Icon, count }) => (
            <div key={type} className="flex items-center space-x-3 py-1">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
                className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
              />
              <label
                htmlFor={`type-${type}`}
                className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 min-h-[44px]"
              >
                <Icon className="h-4 w-4 text-gray-500" />
                <span>{label}</span>
                {count !== undefined && <span className="text-gray-400 text-xs">({count})</span>}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Access Level */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Access Level</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'all' as const, label: 'All', icon: Star, count: counts?.total },
            { value: 'free' as const, label: 'Free', icon: Shield, count: counts?.free },
            { value: 'paid' as const, label: 'Premium', icon: DollarSign, count: counts?.paid },
          ].map(({ value, label, icon: Icon, count }) => (
            <Button
              key={value}
              variant={selectedAccess === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAccess(value)}
              className={cn(
                'justify-center text-xs flex-col h-auto py-3 min-h-[60px]',
                selectedAccess === value && 'bg-[#0891B2] border-[#0891B2] hover:bg-[#0E7490]',
              )}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-center">{label}</span>
              {count !== undefined && <span className="text-xs opacity-70">({count})</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">Topics</h3>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-sm text-gray-500 hover:text-[#0891B2] transition-colors duration-200"
              >
                Clear tags
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag.slug || tag.id.toString())
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all duration-200 hover:scale-105 min-h-[36px] px-3 py-2 text-sm',
                    isSelected
                      ? 'bg-[#0891B2] text-white border-[#0891B2] hover:bg-[#0E7490]'
                      : 'hover:border-[#0891B2] hover:text-[#0891B2]',
                  )}
                  onClick={() => handleTagToggle(tag.slug || tag.id.toString())}
                >
                  {tag.title}
                  {isSelected && <X className="h-3 w-3 ml-1" />}
                </Badge>
              )
            })}
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">
              Active Filters ({activeFiltersCount})
            </h4>
            <Button
              onClick={clearAllFilters}
              size="sm"
              variant="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {/* Resource Types */}
            {selectedTypes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
                    onClick={() => handleTypeToggle(type)}
                  >
                    {type}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Access Level */}
            {selectedAccess !== 'all' && (
              <div className="flex flex-wrap gap-1">
                <Badge
                  variant="secondary"
                  className="cursor-pointer bg-green-100 text-green-700 hover:bg-green-200"
                  onClick={() => setSelectedAccess('all')}
                >
                  {selectedAccess}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </div>
            )}

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTags.slice(0, 5).map((tagSlug) => {
                  const tag = tags.find((t) => (t.slug || t.id.toString()) === tagSlug)
                  return tag ? (
                    <Badge
                      key={tagSlug}
                      variant="secondary"
                      className="cursor-pointer bg-purple-100 text-purple-700 hover:bg-purple-200"
                      onClick={() => handleTagToggle(tagSlug)}
                    >
                      {tag.title}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ) : null
                })}
                {selectedTags.length > 5 && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                    +{selectedTags.length - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full relative">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#0891B2] text-white text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm p-0 gap-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <SheetTitle className="text-xl font-semibold text-gray-900 text-left">
              Filter Resources
            </SheetTitle>
            {activeFiltersCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
              </p>
            )}
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              <FilterContent />
            </div>
          </div>

          {/* Mobile Action Footer */}
          {activeFiltersCount > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-white sticky bottom-0">
              <div className="flex gap-3">
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setIsSheetOpen(false)}
                  className="flex-1 bg-[#0891B2] hover:bg-[#0E7490]"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={className}>
      <FilterContent />
    </div>
  )
}
