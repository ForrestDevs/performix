'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Clock,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Video,
  Download,
  TrendingUp,
  Users,
  ChevronRight,
  Play,
  Star,
  Grid3X3,
  List,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'
import { cn } from '@/lib/utilities/ui'

export default function ResourcesPage() {
  const visibleElements = useScrollAnimation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Articles')
  const [viewMode, setViewMode] = useState('grid')
  const [favoriteIds, setFavoriteIds] = useState(new Set())

  const isVisible = (id: string) => visibleElements.has(id)

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

  const categories = [
    'All Articles',
    'Training & Development',
    'Recruiting Guide',
    'Mental Performance',
    'Success Stories',
    'Parent Resources',
  ]

  const featuredArticle = {
    id: 'featured',
    title: 'The Complete Guide to D1 Hockey Recruiting: What Every AAA Player Needs to Know',
    excerpt:
      'A comprehensive breakdown of the recruiting process, timeline, and key strategies that separate committed players from the rest.',
    author: {
      name: 'Jake Morrison',
      role: 'Harvard Mentor',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    image: '/placeholder.svg?height=400&width=800',
    category: 'Recruiting Guide',
    readTime: 12,
    publishDate: '2 days ago',
    views: 2847,
    likes: 156,
    featured: true,
  }

  const articles = [
    {
      id: '1',
      title: '5 Mental Game Strategies That Separate Elite Players',
      excerpt:
        'Discover the psychological techniques used by D1 athletes to perform under pressure.',
      author: {
        name: 'Sarah Chen',
        role: 'Michigan Mentor',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      image: '/placeholder.svg?height=300&width=400',
      category: 'Mental Performance',
      readTime: 8,
      publishDate: '1 week ago',
      views: 1923,
      likes: 89,
      type: 'article',
    },
    {
      id: '2',
      title: 'Video Analysis: Breaking Down Power Play Systems',
      excerpt: 'Learn how to read and execute power play strategies like the pros.',
      author: {
        name: 'Mike Rodriguez',
        role: 'Boston College Mentor',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      image: '/placeholder.svg?height=300&width=400',
      category: 'Training & Development',
      readTime: 15,
      publishDate: '3 days ago',
      views: 3241,
      likes: 203,
      type: 'video',
    },
    {
      id: '3',
      title: "Parent's Guide: Supporting Your Child's Hockey Journey",
      excerpt: 'Essential tips for hockey parents on how to best support their young athlete.',
      author: {
        name: 'Emma Thompson',
        role: 'Minnesota Mentor',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      image: '/placeholder.svg?height=300&width=400',
      category: 'Parent Resources',
      readTime: 6,
      publishDate: '5 days ago',
      views: 1567,
      likes: 124,
      type: 'guide',
    },
    {
      id: '4',
      title: "From AAA to Harvard: Alex's Complete Journey",
      excerpt: "Follow one player's transformation from local AAA to Ivy League commitment.",
      author: {
        name: 'Alex Johnson',
        role: 'Success Story',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      image: '/placeholder.svg?height=300&width=400',
      category: 'Success Stories',
      readTime: 10,
      publishDate: '1 week ago',
      views: 2156,
      likes: 178,
      type: 'story',
    },
    {
      id: '5',
      title: 'Off-Season Training: Building Elite-Level Conditioning',
      excerpt: 'A comprehensive off-season training program designed by D1 strength coaches.',
      author: {
        name: 'David Park',
        role: 'Strength Coach',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      image: '/placeholder.svg?height=300&width=400',
      category: 'Training & Development',
      readTime: 12,
      publishDate: '2 weeks ago',
      views: 1834,
      likes: 95,
      type: 'guide',
    },
    {
      id: '6',
      title: 'Scholarship Negotiations: Maximizing Your Offer',
      excerpt: 'Expert advice on how to navigate scholarship offers and negotiations.',
      author: {
        name: 'Lisa Rodriguez',
        role: 'Former D1 Coach',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      image: '/placeholder.svg?height=300&width=400',
      category: 'Recruiting Guide',
      readTime: 9,
      publishDate: '4 days ago',
      views: 2789,
      likes: 167,
      type: 'article',
    },
  ]

  const trendingArticles = [
    { title: '5 Mental Game Strategies That Separate Elite Players', views: 1923 },
    { title: 'Video Analysis: Breaking Down Power Play Systems', views: 3241 },
    { title: 'The Complete Guide to D1 Hockey Recruiting', views: 2847 },
  ]

  const authorSpotlight = {
    name: 'Jake Morrison',
    role: 'Harvard Mentor & 3x All-American',
    avatar: '/placeholder.svg?height=80&width=80',
    bio: 'Former Harvard captain with extensive recruiting experience. Specializes in helping forwards develop their offensive game.',
    articles: 12,
    followers: 1247,
    recentArticles: [
      'The Complete Guide to D1 Hockey Recruiting',
      'Forward Positioning in Modern Hockey',
      'Building Confidence on the Ice',
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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
              The Path to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]">
                Elite Performance
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Insights, tips, and stories from D1+ mentors and athletes to accelerate your hockey
              development
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles, guides, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-[#0891B2] rounded-xl transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'ghost'}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-[#0891B2] text-white'
                    : 'text-gray-600 hover:text-[#0891B2] hover:bg-[#0891B2]/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="featured-article"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('featured-article')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <Card className="border-0 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-96 lg:h-auto group overflow-hidden">
                    <Image
                      src={featuredArticle.image || '/placeholder.svg'}
                      alt={featuredArticle.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-gradient-to-r from-[#8B5CF6] to-[#0891B2] text-white animate-pulse">
                        Featured Article
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <Badge variant="outline" className="border-white text-white mb-3">
                        {featuredArticle.category}
                      </Badge>
                      <h2 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-200 text-lg">{featuredArticle.excerpt}</p>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-full overflow-hidden">
                        <Image
                          src={featuredArticle.author.avatar || '/placeholder.svg'}
                          alt={featuredArticle.author.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{featuredArticle.author.name}</p>
                        <p className="text-[#0891B2] text-sm">{featuredArticle.author.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mb-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{featuredArticle.readTime} min read</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>{featuredArticle.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>{featuredArticle.likes} likes</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white flex-1">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite(featuredArticle.id)}
                        className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
                      >
                        <Heart
                          className={`h-4 w-4 ${favoriteIds.has(featuredArticle.id) ? 'fill-current' : ''}`}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Articles */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                  <Badge variant="outline" className="text-[#0891B2] border-[#0891B2]">
                    {articles.length} articles
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
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Liked</option>
                    <option>Trending</option>
                  </select>
                </div>
              </div>

              {/* Articles Grid/List */}
              <div
                id="articles-grid"
                data-scroll-animate
                className={`transition-all duration-1000 ${isVisible('articles-grid') ? 'opacity-100' : 'opacity-0'}`}
              >
                {viewMode === 'grid' ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {articles.map((article, index) => (
                      <Card
                        key={article.id}
                        className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer ${
                          isVisible('articles-grid')
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-0">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={article.image || '/placeholder.svg'}
                              alt={article.title}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge
                                className={`${
                                  article.type === 'video'
                                    ? 'bg-red-500'
                                    : article.type === 'guide'
                                      ? 'bg-green-500'
                                      : article.type === 'story'
                                        ? 'bg-[#8B5CF6]'
                                        : 'bg-[#0891B2]'
                                } text-white`}
                              >
                                {article.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                                {article.type === 'guide' && <Download className="h-3 w-3 mr-1" />}
                                {article.type === 'story' && <Star className="h-3 w-3 mr-1" />}
                                {article.type === 'article' && (
                                  <BookOpen className="h-3 w-3 mr-1" />
                                )}
                                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(article.id)
                                }}
                                className="p-1 bg-white/80 hover:bg-white"
                              >
                                <Heart
                                  className={`h-4 w-4 transition-colors duration-200 ${
                                    favoriteIds.has(article.id)
                                      ? 'text-red-500 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              </Button>
                            </div>
                            {article.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                <Button
                                  size="lg"
                                  className="bg-white/90 text-red-500 rounded-full w-12 h-12 p-0"
                                >
                                  <Play className="h-4 w-4 ml-0.5" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <Badge variant="outline" className="mb-3 text-xs">
                              {article.category}
                            </Badge>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0891B2] transition-colors duration-200">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-full overflow-hidden">
                                  <Image
                                    src={article.author.avatar || '/placeholder.svg'}
                                    alt={article.author.name}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {article.author.name}
                                  </p>
                                  <p className="text-xs text-gray-500">{article.author.role}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{article.readTime} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{article.views.toLocaleString()}</span>
                                </div>
                              </div>
                              <span>{article.publishDate}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {articles.map((article, index) => (
                      <Card
                        key={article.id}
                        className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer ${
                          isVisible('articles-grid')
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-8'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-6">
                            <div className="relative w-32 h-24 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={article.image || '/placeholder.svg'}
                                alt={article.title}
                                width={128}
                                height={96}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              {article.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-6 w-6 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Badge variant="outline" className="mb-2 text-xs">
                                    {article.category}
                                  </Badge>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0891B2] transition-colors duration-200">
                                    {article.title}
                                  </h3>
                                  <p className="text-gray-600 mb-3">{article.excerpt}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(article.id)
                                  }}
                                  className="p-2"
                                >
                                  <Heart
                                    className={`h-5 w-5 transition-colors duration-200 ${
                                      favoriteIds.has(article.id)
                                        ? 'text-red-500 fill-current'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-full overflow-hidden">
                                      <Image
                                        src={article.author.avatar || '/placeholder.svg'}
                                        alt={article.author.name}
                                        width={24}
                                        height={24}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                      {article.author.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{article.readTime} min</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Eye className="h-3 w-3" />
                                      <span>{article.views.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">{article.publishDate}</span>
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
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Trending Articles */}
              <Card
                id="trending-sidebar"
                data-scroll-animate
                className={`border-0 shadow-lg transition-all duration-1000 ${
                  isVisible('trending-sidebar')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-[#0891B2]" />
                    <h3 className="text-lg font-bold text-gray-900">Trending This Week</h3>
                  </div>
                  <div className="space-y-4">
                    {trendingArticles.map((article, index) => (
                      <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#0891B2] transition-colors duration-200 line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center space-x-1 mt-1">
                            <Eye className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {article.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Author Spotlight */}
              <Card
                id="author-spotlight"
                data-scroll-animate
                className={`border-0 shadow-lg transition-all duration-1000 ${
                  isVisible('author-spotlight')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Mentor Writer</h3>
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <Image
                        src={authorSpotlight.avatar || '/placeholder.svg'}
                        alt={authorSpotlight.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900">{authorSpotlight.name}</h4>
                    <p className="text-[#0891B2] text-sm mb-3">{authorSpotlight.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{authorSpotlight.bio}</p>
                    <div className="flex justify-center space-x-6 mb-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-[#0891B2]">{authorSpotlight.articles}</p>
                        <p className="text-gray-500 text-xs">Articles</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-[#0891B2]">
                          {authorSpotlight.followers.toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs">Followers</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#0891B2] hover:bg-[#0E7490] text-white w-full mb-4"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                    <div className="text-left">
                      <h5 className="font-medium text-gray-900 mb-2 text-sm">Recent Articles:</h5>
                      <ul className="space-y-1">
                        {authorSpotlight.recentArticles.map((title, index) => (
                          <li
                            key={index}
                            className="text-xs text-gray-600 hover:text-[#0891B2] cursor-pointer transition-colors duration-200"
                          >
                            • {title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card
                id="newsletter-signup"
                data-scroll-animate
                className={`border-0 shadow-lg bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] text-white transition-all duration-1000 ${
                  isVisible('newsletter-signup')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Stay Ahead of the Game</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get the latest hockey development insights delivered to your inbox weekly.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                    />
                    <Button className="bg-white text-[#0891B2] hover:bg-gray-100 w-full">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-white/70 text-xs mt-3">
                    Join 2,500+ hockey players and parents
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0891B2] to-[#0E7490]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Take Your Game to the Next Level?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect with elite mentors who can provide personalized guidance for your hockey journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mentors"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-[#0891B2] hover:bg-[#0E7490] text-white px-8',
              )}
            >
              Find Your Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
