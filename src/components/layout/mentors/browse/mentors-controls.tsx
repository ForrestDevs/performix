'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Grid3X3, List } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useMentorViewMode } from './view-mode-context'

interface MentorsControlsProps {
  mentorCount: number
  totalCount: number
}

export function MentorsControls({ mentorCount, totalCount }: MentorsControlsProps) {
  const { viewMode, setViewMode } = useMentorViewMode()
  const [sortBy, setSortBy] = useQueryState('sort', { defaultValue: 'name' })

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">All Mentors</h2>
        <Badge variant="outline" className="text-[#0891B2] border-[#0891B2]">
          {mentorCount} of {totalCount} mentors
        </Badge>
      </div>

      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 hidden sm:inline">Sort:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="position">Position</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 hidden sm:inline">View:</span>
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`rounded-r-none ${
                viewMode === 'grid'
                  ? 'bg-[#0891B2] text-white hover:bg-[#0891B2]/90'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={`rounded-l-none border-l ${
                viewMode === 'list'
                  ? 'bg-[#0891B2] text-white hover:bg-[#0891B2]/90'
                  : 'hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
