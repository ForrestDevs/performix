'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Grid3X3, List } from 'lucide-react'
import { useQueryState } from 'nuqs'

interface MentorsControlsProps {
  mentorCount: number
}

export function MentorsControls({ mentorCount }: MentorsControlsProps) {
  const [viewMode, setViewMode] = useQueryState('view', { defaultValue: 'grid' })
  const [sortBy, setSortBy] = useQueryState('sort', { defaultValue: 'rating' })

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">All Mentors</h2>
        <Badge variant="outline" className="text-[#0891B2] border-[#0891B2]">
          {mentorCount} mentors found
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
        {/* <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0891B2] focus:outline-none"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price-low">Sort by Price (Low to High)</option>
          <option value="price-high">Sort by Price (High to Low)</option>
          <option value="experience">Sort by Experience</option>
          <option value="availability">Sort by Availability</option>
        </select> */}
      </div>
    </div>
  )
}
