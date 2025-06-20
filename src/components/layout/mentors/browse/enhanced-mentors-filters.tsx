'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { SlidersHorizontal, X, Filter } from 'lucide-react'
import { useState } from 'react'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { MentorsResponse } from '@/lib/data/mentors'

interface EnhancedMentorsFiltersProps {
  filtersData: MentorsResponse['filters']
  isMobile?: boolean
  className?: string
}

const skillDisplayMap: { [key: string]: string } = {
  'defensive-awareness': 'Defensive Awareness',
  'defending-the-rush': 'Defending the Rush',
  'offensive-production': 'Offensive Production',
  'breaking-out': 'Breaking Out',
  'winning-battles': 'Winning Battles',
  playmaking: 'Playmaking',
  'skating-ability': 'Skating Ability',
  'puck-handling': 'Puck Handling',
  'reaction-speed': 'Reaction Speed',
  agility: 'Agility',
  physicality: 'Physicality',
  'goal-scoring': 'Goal Scoring',
  speed: 'Speed',
  wallplay: 'Wallplay',
  stickhandling: 'Stickhandling',
  'hockey-iq': 'Hockey IQ',
  teamwork: 'Teamwork',
  leadership: 'Leadership',
}

const positionDisplayMap: { [key: string]: string } = {
  forward: 'Forward',
  defence: 'Defence',
  goalie: 'Goalie',
}

const levelDisplayMap: { [key: string]: string } = {
  d1: 'D1',
  pro: 'Professional',
  usports: 'USports',
}

const sportsDisplayMap: { [key: string]: string } = {
  hockey: 'Hockey',
  soccer: 'Soccer',
  baseball: 'Baseball',
  basketball: 'Basketball',
  volleyball: 'Volleyball',
}

export function EnhancedMentorsFilters({
  filtersData,
  isMobile = false,
}: EnhancedMentorsFiltersProps) {
  const [position, setPosition] = useQueryState(
    'position',
    parseAsArrayOf(parseAsString).withDefault([]),
  )
  const [levelOfPlay, setLevelOfPlay] = useQueryState(
    'levelOfPlay',
    parseAsArrayOf(parseAsString).withDefault([]),
  )
  const [skills, setSkills] = useQueryState('skills', parseAsArrayOf(parseAsString).withDefault([]))
  const [sports, setSports] = useQueryState('sports', parseAsArrayOf(parseAsString).withDefault([]))
  const [featured, setFeatured] = useQueryState('featured', { defaultValue: 'all' })
  const [isOpen, setIsOpen] = useState(false)

  // Count active filters
  const activeFiltersCount =
    position.length +
    levelOfPlay.length +
    skills.length +
    sports.length +
    (featured !== 'all' ? 1 : 0)

  // Clear all filters
  const clearAllFilters = () => {
    setPosition([])
    setLevelOfPlay([])
    setSkills([])
    setSports([])
    setFeatured('all')
  }

  // Remove specific filter
  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case 'position':
        setPosition(position.filter((p) => p !== value))
        break
      case 'levelOfPlay':
        setLevelOfPlay(levelOfPlay.filter((l) => l !== value))
        break
      case 'skills':
        setSkills(skills.filter((s) => s !== value))
        break
      case 'sports':
        setSports(sports.filter((s) => s !== value))
        break
      case 'featured':
        setFeatured('all')
        break
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-[#0891B2] hover:text-[#0891B2]/80"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {position.map((pos) => (
              <Badge key={pos} variant="secondary" className="gap-1">
                {positionDisplayMap[pos] || pos}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('position', pos)}
                />
              </Badge>
            ))}
            {levelOfPlay.map((level) => (
              <Badge key={level} variant="secondary" className="gap-1">
                {levelDisplayMap[level] || level}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('levelOfPlay', level)}
                />
              </Badge>
            ))}
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skillDisplayMap[skill] || skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('skills', skill)}
                />
              </Badge>
            ))}
            {sports.map((sport) => (
              <Badge key={sport} variant="secondary" className="gap-1">
                {sportsDisplayMap[sport] || sport}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('sports', sport)}
                />
              </Badge>
            ))}
            {featured !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {featured === 'featured' ? 'Featured Only' : 'Regular Only'}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('featured', featured)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Featured Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Featured Status</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Mentors' },
            { value: 'featured', label: 'Featured Only' },
            { value: 'regular', label: 'Regular Only' },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`featured-${option.value}`}
                checked={featured === option.value}
                onCheckedChange={() => setFeatured(option.value)}
              />
              <label
                htmlFor={`featured-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Position Filter */}
      {filtersData.positions.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Position</h3>
          <div className="space-y-2">
            {filtersData.positions.map((pos) => (
              <div key={pos.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`position-${pos.value}`}
                    checked={position.includes(pos.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPosition([...position, pos.value])
                      } else {
                        setPosition(position.filter((p) => p !== pos.value))
                      }
                    }}
                  />
                  <label
                    htmlFor={`position-${pos.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {positionDisplayMap[pos.value] || pos.value}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({pos.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level of Play Filter */}
      {filtersData.levelOfPlay.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Level of Play</h3>
          <div className="space-y-2">
            {filtersData.levelOfPlay.map((level) => (
              <div key={level.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level.value}`}
                    checked={levelOfPlay.includes(level.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setLevelOfPlay([...levelOfPlay, level.value])
                      } else {
                        setLevelOfPlay(levelOfPlay.filter((l) => l !== level.value))
                      }
                    }}
                  />
                  <label
                    htmlFor={`level-${level.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {levelDisplayMap[level.value] || level.value}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({level.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sports Filter */}
      {filtersData.sports.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Sports</h3>
          <div className="space-y-2">
            {filtersData.sports.map((sport) => (
              <div key={sport.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`sport-${sport.value}`}
                    checked={sports.includes(sport.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSports([...sports, sport.value])
                      } else {
                        setSports(sports.filter((s) => s !== sport.value))
                      }
                    }}
                  />
                  <label
                    htmlFor={`sport-${sport.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {sportsDisplayMap[sport.value] || sport.value}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({sport.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Filter - Show top 10 most common */}
      {filtersData.skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Skills</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filtersData.skills.slice(0, 15).map((skill) => (
              <div key={skill.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.value}`}
                    checked={skills.includes(skill.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSkills([...skills, skill.value])
                      } else {
                        setSkills(skills.filter((s) => s !== skill.value))
                      }
                    }}
                  />
                  <label
                    htmlFor={`skill-${skill.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {skillDisplayMap[skill.value] || skill.value}
                  </label>
                </div>
                <span className="text-xs text-gray-500">({skill.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-[#0891B2]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
          <div className="flex flex-col h-full">
            <SheetHeader className="sticky top-0 bg-white pb-4 border-b">
              <SheetTitle>Filter Mentors</SheetTitle>
            </SheetHeader>
            <div className="flex-1 py-6">
              <FilterContent />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="bg-white rounded-lg border p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
          {activeFiltersCount > 0 && <Badge className="bg-[#0891B2]">{activeFiltersCount}</Badge>}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-[#0891B2] hover:text-[#0891B2]/80"
          >
            Clear All
          </Button>
        )}
      </div>
      <FilterContent />
    </div>
  )
}
