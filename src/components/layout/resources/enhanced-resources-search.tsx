'use client'

import { useState, useTransition, useEffect, useRef, useCallback } from 'react'
import { useQueryState, parseAsString } from 'nuqs'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utilities/ui'

interface EnhancedResourcesSearchProps {
  placeholder?: string
  className?: string
}

export default function EnhancedResourcesSearch({
  placeholder = 'Search articles, blueprints, courses, and more...',
  className,
}: EnhancedResourcesSearchProps) {
  const [isPending, startTransition] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const isInitializedRef = useRef(false)

  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      startTransition,
    }),
  )

  // Initialize input value from URL state on mount only
  useEffect(() => {
    if (!isInitializedRef.current) {
      setInputValue(search)
      isInitializedRef.current = true
    }
  }, [search])

  // Debounced URL update function
  const debouncedUpdateSearch = useCallback(
    (value: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = setTimeout(() => {
        setSearch(value || null)
      }, 500) // 500ms debounce delay
    },
    [setSearch],
  )

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  const handleInputChange = (value: string) => {
    setInputValue(value) // Update local state immediately
    debouncedUpdateSearch(value) // Debounce URL state update
  }

  const clearSearch = () => {
    setInputValue('')
    setSearch(null) // Immediate update for clear action
    // Clear any pending debounced updates
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }
    searchInputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsExpanded(true)
  }

  const handleBlur = () => {
    setIsExpanded(false)
  }

  const hasContent = inputValue.length > 0

  return (
    <div className={cn('relative max-w-2xl mx-auto w-full', className)}>
      <div
        className={cn(
          'relative transition-all duration-300',
          isExpanded ? 'transform scale-105' : '',
        )}
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />

        <Input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            'pl-12 py-4 text-base sm:text-lg border-2 border-gray-200 focus:border-[#0891B2] rounded-xl transition-all duration-300 bg-white shadow-sm focus:shadow-lg w-full',
            hasContent ? 'pr-20' : 'pr-4',
          )}
          disabled={isPending}
        />

        {/* Loading indicator */}
        {isPending && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0891B2]"></div>
          </div>
        )}

        {/* Clear button */}
        {hasContent && !isPending && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        )}
      </div>
    </div>
  )
}
