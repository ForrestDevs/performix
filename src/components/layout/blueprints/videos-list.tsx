'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Play, ExternalLink, Clock } from 'lucide-react'
import Image from 'next/image'

interface Video {
  title: string
  url: string
  duration?: string
  thumbnail?: string
}

interface VideosListProps {
  videos: Video[]
  isAuthenticated: boolean
  onAuthRequired: () => void
}

export default function VideosList({ videos, isAuthenticated, onAuthRequired }: VideosListProps) {
  if (!videos || videos.length === 0) return null

  const handleVideoClick = (video: Video) => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }

    window.open(video.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Play className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
          {videos.length} video{videos.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Video Thumbnail/Preview */}
            <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              ) : (
                <>
                  {/* Try to extract thumbnail from video URL */}
                  {(() => {
                    // YouTube thumbnail extraction
                    const youtubeMatch = video.url.match(
                      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
                    )
                    if (youtubeMatch) {
                      const videoId = youtubeMatch[1]
                      return (
                        <Image
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                          onError={(e) => {
                            // Fallback to default thumbnail if YouTube thumbnail fails
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      )
                    }

                    // Loom thumbnail extraction
                    const loomMatch = video.url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/)
                    if (loomMatch) {
                      const videoId = loomMatch[1]
                      return (
                        <Image
                          src={`https://cdn.loom.com/sessions/thumbnails/${videoId}-with-play.gif`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          width={100}
                          height={100}
                          onError={(e) => {
                            // Fallback to default thumbnail if Loom thumbnail fails
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      )
                    }

                    // Default fallback
                    return (
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="h-8 w-8 text-purple-600" />
                      </div>
                    )
                  })()}
                </>
              )}

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-100 group-hover:scale-110 transition-transform duration-300">
                  <Play
                    className="h-6 w-6 text-purple-600 ml-1"
                    onClick={() => handleVideoClick(video)}
                  />
                </div>
              </div>

              {/* Duration Badge */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {video.title}
              </h3>

              <Button
                onClick={() => handleVideoClick(video)}
                variant={isAuthenticated ? 'default' : 'outline'}
                size="sm"
                className={
                  isAuthenticated
                    ? 'w-full bg-purple-600 hover:bg-purple-700 text-white'
                    : 'w-full border-gray-300 text-gray-500 cursor-not-allowed'
                }
              >
                {isAuthenticated ? (
                  <>
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Watch Video
                  </>
                ) : (
                  'Sign in to watch'
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
        >
          <p className="text-sm text-purple-800">
            <span className="font-medium">Sign in required:</span> Create a free account to watch
            video tutorials and access the full blueprint content.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
