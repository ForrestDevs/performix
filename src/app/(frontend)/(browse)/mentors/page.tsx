'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Star,
  DollarSign,
  Heart,
  Share2,
  Play,
  ChevronRight,
  Users,
  Award,
  SlidersHorizontal,
  Grid3X3,
  List,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'
import { cn } from '@/lib/utilities/ui'

export default function BrowseMentorsPage() {
  const visibleElements = useScrollAnimation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    position: [],
    university: [],
    experience: [],
    availability: [],
    priceRange: [0, 500],
  })
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const isVisible = (id: string) => visibleElements.has(id)

  // Animated placeholder text
  const placeholders = ['Search by university...', 'Search by position...', 'Search by name...']

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Sample mentor data
  const mentors = [
    {
      id: '1',
      name: 'Jake Morrison',
      position: 'Forward',
      university: 'Harvard University',
      experience: 'D1 + Pro',
      rating: 4.9,
      reviews: 127,
      price: 150,
      availability: 'Available',
      specializations: ['Recruiting', 'Skills Development', 'Mental Game'],
      bio: '3x All-American with extensive recruiting experience. Helped 50+ players secure D1 commitments.',
      successRate: 96,
      studentsHelped: 73,
      achievements: ['3x All-American', 'Team Captain', 'Academic All-Star'],
      videoIntro: true,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      position: 'Defenseman',
      university: 'University of Michigan',
      experience: 'D1 + Olympic',
      rating: 5.0,
      reviews: 89,
      price: 200,
      availability: 'Busy',
      specializations: ['Defense Strategy', 'Leadership', 'Recruiting'],
      bio: 'Olympic medalist and former team captain. Specializes in defensive positioning and leadership development.',
      successRate: 98,
      studentsHelped: 45,
      achievements: ['Olympic Silver', 'NCAA Champion', 'Defensive Player of Year'],
      videoIntro: true,
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      position: 'Goalie',
      university: 'Boston College',
      experience: 'D1 + NHL Draft',
      rating: 4.8,
      reviews: 156,
      price: 175,
      availability: 'Available',
      specializations: ['Goaltending', 'Mental Toughness', 'Video Analysis'],
      bio: 'NHL draft pick with expertise in goaltending fundamentals and mental preparation.',
      successRate: 94,
      studentsHelped: 62,
      achievements: ['NHL Draft Pick', 'Hockey East Champion', 'All-Tournament Team'],
      videoIntro: false,
    },
    {
      id: '4',
      name: 'Emma Thompson',
      position: 'Forward',
      university: 'University of Minnesota',
      experience: 'D1 + NCAA Champion',
      rating: 4.9,
      reviews: 203,
      price: 125,
      availability: 'Available',
      specializations: ['Offensive Strategy', 'Power Play', 'Recruiting'],
      bio: 'NCAA champion with a focus on offensive development and power play systems.',
      successRate: 92,
      studentsHelped: 89,
      achievements: ['NCAA Champion', 'Conference MVP', 'Academic Excellence'],
      videoIntro: true,
    },
    {
      id: '5',
      name: 'Alex Johnson',
      position: 'Forward',
      university: 'Boston University',
      experience: 'D1',
      rating: 4.7,
      reviews: 78,
      price: 100,
      availability: 'Available',
      specializations: ['Skills Development', 'Conditioning', 'Recruiting'],
      bio: 'Recent graduate with fresh perspective on modern recruiting and training methods.',
      successRate: 89,
      studentsHelped: 34,
      achievements: ['Team Captain', 'Conference All-Star', 'Leadership Award'],
      videoIntro: false,
    },
    {
      id: '6',
      name: 'Maya Patel',
      position: 'Defenseman',
      university: 'Yale University',
      experience: 'D1',
      rating: 4.8,
      reviews: 92,
      price: 140,
      availability: 'Limited',
      specializations: ['Academic Balance', 'Time Management', 'Recruiting'],
      bio: 'Ivy League graduate specializing in balancing academics and athletics at the highest level.',
      successRate: 95,
      studentsHelped: 41,
      achievements: ['Academic All-American', 'Ivy League Champion', 'Scholar Athlete'],
      videoIntro: true,
    },
  ]

  const featuredMentors = mentors.filter((mentor) => mentor.rating >= 4.9).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-white py-16 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-[#0891B2] rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-[#8B5CF6] rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-[#0891B2] rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Perfect Mentor
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse elite D1+ players ready to guide your journey to Division 1 hockey
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
              {[
                'All Positions',
                'Forwards',
                'Defensemen',
                'Goalies',
                'Ivy League',
                'Available Now',
              ].map((filter, index) => (
                <Badge
                  key={filter}
                  variant="outline"
                  className="px-4 py-2 cursor-pointer hover:bg-[#0891B2] hover:text-white hover:border-[#0891B2] transition-all duration-300 hover:scale-105"
                >
                  {filter}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-[#0891B2]" />
                <span>{mentors.length} Active Mentors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>4.9 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-[#0891B2]" />
                <span>94% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0891B2]/5 to-[#8B5CF6]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="featured-header"
            data-scroll-animate
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible('featured-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Rated Mentors This Month</h2>
            <p className="text-gray-600">Our highest-rated mentors with proven track records</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredMentors.map((mentor, index) => (
              <Card
                key={mentor.id}
                id={`featured-${index}`}
                data-scroll-animate
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white relative overflow-hidden group ${
                  isVisible(`featured-${index}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#0891B2] text-white animate-pulse">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 overflow-hidden">
                    <Image
                      src="/mateo-hockey.png"
                      alt={mentor.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {mentor.videoIntro && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <Button
                          size="lg"
                          className="bg-white/90 text-[#0891B2] rounded-full w-16 h-16 p-0"
                        >
                          <Play className="h-6 w-6 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(mentor.id)}
                        className="p-1 hover:bg-red-50"
                      >
                        <Heart
                          className={`h-5 w-5 transition-colors duration-200 ${
                            favoriteIds.has(mentor.id)
                              ? 'text-red-500 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      </Button>
                    </div>
                    <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-600">{mentor.university}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-sm text-gray-500">({mentor.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">${mentor.price}/session</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.specializations.slice(0, 2).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">All Mentors</h2>
              <Badge variant="outline" className="text-[#0891B2] border-[#0891B2]">
                {mentors.length} mentors found
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
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#0891B2] focus:outline-none">
                <option>Sort by Rating</option>
                <option>Sort by Price (Low to High)</option>
                <option>Sort by Price (High to Low)</option>
                <option>Sort by Experience</option>
                <option>Sort by Availability</option>
              </select>
            </div>
          </div>

          {/* Mentor Grid */}
          <div
            id="mentor-grid"
            data-scroll-animate
            className={`transition-all duration-1000 ${isVisible('mentor-grid') ? 'opacity-100' : 'opacity-0'}`}
          >
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map((mentor, index) => (
                  <Card
                    key={mentor.id}
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer ${
                      isVisible('mentor-grid')
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-48 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 overflow-hidden">
                        <Image
                          src="/mateo-hockey.png"
                          alt={mentor.name}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={`${
                              mentor.availability === 'Available'
                                ? 'bg-green-500'
                                : mentor.availability === 'Limited'
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            } text-white`}
                          >
                            {mentor.availability}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(mentor.id)
                            }}
                            className="p-1 bg-white/80 hover:bg-white"
                          >
                            <Heart
                              className={`h-4 w-4 transition-colors duration-200 ${
                                favoriteIds.has(mentor.id)
                                  ? 'text-red-500 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 bg-white/80 hover:bg-white"
                          >
                            <Share2 className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>
                        {mentor.videoIntro && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                            <Button
                              size="lg"
                              className="bg-white/90 text-[#0891B2] rounded-full w-12 h-12 p-0"
                            >
                              <Play className="h-4 w-4 ml-0.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{mentor.rating}</span>
                          </div>
                        </div>
                        <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                          <span className="text-sm text-gray-600">{mentor.university}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {mentor.specializations.slice(0, 3).map((spec) => (
                            <Badge key={spec} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            ${mentor.price}/session
                          </span>
                          <Button size="sm" className="bg-[#0891B2] hover:bg-[#0E7490] text-white">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {mentors.map((mentor, index) => (
                  <Card
                    key={mentor.id}
                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer ${
                      isVisible('mentor-grid')
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="relative w-32 h-32 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src="/mateo-hockey.png"
                            alt={mentor.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={`text-xs ${
                                mentor.availability === 'Available'
                                  ? 'bg-green-500'
                                  : mentor.availability === 'Limited'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                              } text-white`}
                            >
                              {mentor.availability}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {mentor.name}
                              </h3>
                              <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                                <span className="text-sm text-gray-600">{mentor.university}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(mentor.id)
                                }}
                                className="p-2"
                              >
                                <Heart
                                  className={`h-5 w-5 transition-colors duration-200 ${
                                    favoriteIds.has(mentor.id)
                                      ? 'text-red-500 fill-current'
                                      : 'text-gray-400'
                                  }`}
                                />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-2">
                                <Share2 className="h-5 w-5 text-gray-400" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{mentor.bio}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {mentor.specializations.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{mentor.rating}</span>
                                <span className="text-sm text-gray-500">
                                  ({mentor.reviews} reviews)
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">{mentor.studentsHelped}</span>{' '}
                                students helped
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">{mentor.successRate}%</span> success
                                rate
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-xl font-bold text-gray-900">
                                ${mentor.price}/session
                              </span>
                              <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white">
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white px-8"
            >
              Load More Mentors
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Can&apos;t Find the Perfect Match?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let us help you find the ideal mentor based on your specific goals and preferences
          </p>
          <Link
            href="https://calendly.com/mateodixon/d1-mentorship-call"
            className={cn("border-white text-white hover:bg-white hover:text-[#0891B2] px-8", buttonVariants({variant: "outline"}))}
          >
              Schedule a Consultation
            </Link>
        </div>
      </section>
    </div>
  )
}
