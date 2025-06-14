'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, SlidersHorizontal, Users, Star, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useQueryState } from 'nuqs'

interface SearchAndFiltersProps {
  mentorCount: number
}

export function SearchAndFilters({ mentorCount }: SearchAndFiltersProps) {
  const [searchQuery, setSearchQuery] = useQueryState('q', { defaultValue: '' })
  const [showFilters, setShowFilters] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [position, setPosition] = useQueryState('position', { defaultValue: '' })

  // Animated placeholder text
  const placeholders = ['Search by university...', 'Search by position...', 'Search by name...']

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleFilterClick = (filter: string) => {
    switch (filter) {
      case 'All Positions':
        setPosition('')
        break
      case 'Forwards':
        setPosition('Forward')
        break
      case 'Defensemen':
        setPosition('Defenseman')
        break
      case 'Goalies':
        setPosition('Goalie')
        break
      default:
        break
    }
  }

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
        Find Your{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
          Perfect Mentor
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Browse elite D1+ players ready to guide your journey to excellence
      </p>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-[#0891B2] rounded-xl transition-all duration-300"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-500 hover:text-[#0891B2]"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['All Positions', 'Forwards', 'Defensemen', 'Goalies', 'Ivy League'].map(
          (filter, index) => (
            <Badge
              key={filter}
              variant={
                (filter === 'All Positions' && !position) ||
                (filter === 'Forwards' && position === 'Forward') ||
                (filter === 'Defensemen' && position === 'Defenseman') ||
                (filter === 'Goalies' && position === 'Goalie')
                  ? 'default'
                  : 'outline'
              }
              className={`px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                (filter === 'All Positions' && !position) ||
                (filter === 'Forwards' && position === 'Forward') ||
                (filter === 'Defensemen' && position === 'Defenseman') ||
                (filter === 'Goalies' && position === 'Goalie')
                  ? 'bg-[#0891B2] text-white border-[#0891B2]'
                  : 'hover:bg-[#0891B2] hover:text-white hover:border-[#0891B2]'
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </Badge>
          ),
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-[#0891B2]" />
          <span>{mentorCount} Active Mentors</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span>4.9 Average Rating</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="h-4 w-4 text-[#0891B2]" />
          <span>100% Athlete Improvement</span>
        </div>
      </div>
    </div>
  )
}
