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

export function MentorsFilters({ filtersData, isMobile = false }: EnhancedMentorsFiltersProps) {
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
    <div className="space-y-8">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-[#0891B2] hover:text-[#0891B2]/80 hover:bg-[#0891B2]/5 font-medium text-sm"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {position.map((pos) => (
              <Badge
                key={pos}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20 hover:bg-[#0891B2]/20 transition-colors"
              >
                {positionDisplayMap[pos] || pos}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-[#0891B2]/70 transition-colors"
                  onClick={() => removeFilter('position', pos)}
                />
              </Badge>
            ))}
            {levelOfPlay.map((level) => (
              <Badge
                key={level}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20 hover:bg-[#0891B2]/20 transition-colors"
              >
                {levelDisplayMap[level] || level}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-[#0891B2]/70 transition-colors"
                  onClick={() => removeFilter('levelOfPlay', level)}
                />
              </Badge>
            ))}
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20 hover:bg-[#0891B2]/20 transition-colors"
              >
                {skillDisplayMap[skill] || skill}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-[#0891B2]/70 transition-colors"
                  onClick={() => removeFilter('skills', skill)}
                />
              </Badge>
            ))}
            {sports.map((sport) => (
              <Badge
                key={sport}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20 hover:bg-[#0891B2]/20 transition-colors"
              >
                {sportsDisplayMap[sport] || sport}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-[#0891B2]/70 transition-colors"
                  onClick={() => removeFilter('sports', sport)}
                />
              </Badge>
            ))}
            {featured !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20 hover:bg-[#0891B2]/20 transition-colors"
              >
                {featured === 'featured' ? 'Featured Only' : 'Regular Only'}
                <X
                  className="h-3.5 w-3.5 cursor-pointer hover:text-[#0891B2]/70 transition-colors"
                  onClick={() => removeFilter('featured', featured)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Featured Filter */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">Featured Status</h3>
        <div className="space-y-3">
          {[
            { value: 'all', label: 'All Mentors' },
            { value: 'featured', label: 'Featured Only' },
            { value: 'regular', label: 'Regular Only' },
          ].map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors cursor-pointer"
              onClick={() => setFeatured(option.value)}
            >
              <Checkbox
                id={`featured-${option.value}`}
                checked={featured === option.value}
                onCheckedChange={() => setFeatured(option.value)}
                className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
              />
              <label
                htmlFor={`featured-${option.value}`}
                className="text-sm font-medium text-gray-700 cursor-pointer select-none flex-1"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Position Filter */}
      {filtersData.positions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">Position</h3>
          <div className="space-y-3">
            {filtersData.positions.map((pos) => (
              <div
                key={pos.value}
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors cursor-pointer"
                onClick={() => {
                  if (position.includes(pos.value)) {
                    setPosition(position.filter((p) => p !== pos.value))
                  } else {
                    setPosition([...position, pos.value])
                  }
                }}
              >
                <div className="flex items-center space-x-3">
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
                    className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
                  />
                  <label
                    htmlFor={`position-${pos.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    {positionDisplayMap[pos.value] || pos.value}
                  </label>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {pos.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Level of Play Filter */}
      {filtersData.levelOfPlay.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">Level of Play</h3>
          <div className="space-y-3">
            {filtersData.levelOfPlay.map((level) => (
              <div
                key={level.value}
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors cursor-pointer"
                onClick={() => {
                  if (levelOfPlay.includes(level.value)) {
                    setLevelOfPlay(levelOfPlay.filter((l) => l !== level.value))
                  } else {
                    setLevelOfPlay([...levelOfPlay, level.value])
                  }
                }}
              >
                <div className="flex items-center space-x-3">
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
                    className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
                  />
                  <label
                    htmlFor={`level-${level.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    {levelDisplayMap[level.value] || level.value}
                  </label>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {level.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sports Filter */}
      {filtersData.sports.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">Sports</h3>
          <div className="space-y-3">
            {filtersData.sports.map((sport) => (
              <div
                key={sport.value}
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors cursor-pointer"
                onClick={() => {
                  if (sports.includes(sport.value)) {
                    setSports(sports.filter((s) => s !== sport.value))
                  } else {
                    setSports([...sports, sport.value])
                  }
                }}
              >
                <div className="flex items-center space-x-3">
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
                    className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
                  />
                  <label
                    htmlFor={`sport-${sport.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    {sportsDisplayMap[sport.value] || sport.value}
                  </label>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {sport.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Filter - Show top 15 most common */}
      {filtersData.skills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">Skills</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {filtersData.skills.slice(0, 15).map((skill) => (
              <div
                key={skill.value}
                className="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors cursor-pointer"
                onClick={() => {
                  if (skills.includes(skill.value)) {
                    setSkills(skills.filter((s) => s !== skill.value))
                  } else {
                    setSkills([...skills, skill.value])
                  }
                }}
              >
                <div className="flex items-center space-x-3">
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
                    className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
                  />
                  <label
                    htmlFor={`skill-${skill.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    {skillDisplayMap[skill.value] || skill.value}
                  </label>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {skill.count}
                </span>
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
          <Button
            variant="outline"
            className="relative border-gray-200 hover:border-[#0891B2] hover:bg-[#0891B2]/5 transition-colors shadow-sm"
          >
            <Filter className="h-4 w-4 mr-2 text-gray-600" />
            <span className="font-medium text-gray-700">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-[#0891B2] text-white border-2 border-white shadow-sm">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-96 overflow-hidden bg-gray-50">
          <div className="flex flex-col h-full">
            <SheetHeader className="sticky top-0 bg-gray-50 pb-6 border-b border-gray-200 z-10">
              <SheetTitle className="text-xl font-bold text-gray-900 text-left">
                Filter Mentors
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto py-6 px-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <FilterContent />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-fit sticky top-6 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0891B2]/10 rounded-lg">
              <SlidersHorizontal className="h-5 w-5 text-[#0891B2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-gray-600">{activeFiltersCount} active</p>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Badge className="bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20 hover:bg-[#0891B2]/20 transition-colors">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-[#0891B2] hover:text-[#0891B2]/80 hover:bg-[#0891B2]/5 font-medium"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      <div className="p-6 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
        <FilterContent />
      </div>
    </div>
  )
}
