'use client'

import { Video } from '@/payload-types'
import { extractYouTubeVideoId } from '@/lib/utilities/extract-youtube'
import { YoutubeVideo, LoomVideo } from '@/components/ui/video'
import MuxPlayer from '@mux/mux-player-react'
import { Clock, Play } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

interface VideoCardProps {
  video: Video
  canView: boolean
  onAccessRequired: () => void
}

export function LockedVideoCard({
  video,
  onAccessRequired,
}: {
  video: Video
  onAccessRequired: () => void
}) {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Play className="h-8 w-8 text-purple-600" />
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-100 group-hover:scale-110 transition-transform duration-300">
            <Play className="h-6 w-6 text-purple-600 ml-1" onClick={onAccessRequired} />
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {video.title}
        </h3>

        <Button
          onClick={onAccessRequired}
          variant={'outline'}
          size="sm"
          className="w-full border-gray-300 text-gray-500 cursor-not-allowed"
        >
          Watch video
        </Button>
      </div>
    </div>
  )
}

export function VideoCard(props: VideoCardProps) {
  const { video, canView, onAccessRequired } = props
  const { source } = video

  if (!canView) {
    return <LockedVideoCard video={video} onAccessRequired={onAccessRequired} />
  }

  if (source === 'youtube' && video.youtubeUrl) {
    const videoId = extractYouTubeVideoId(video.youtubeUrl)

    if (!videoId) {
      return null
    }

    return (
      <div className="aspect-video w-full">
        <YoutubeVideo id={videoId} title={video.title} className="w-full h-full shadow-lg" />
      </div>
    )
  }

  if (source === 'loom' && video.loomUrl) {
    return (
      <div className="aspect-video w-full">
        <LoomVideo url={video.loomUrl} className="w-full h-full shadow-lg" />
      </div>
    )
  }

  if (source === 'mux' && video.playbackOptions?.length) {
    const playbackId = video.playbackOptions[0]?.playbackId
    const videoId = video.playbackOptions[0]?.id

    if (!playbackId || !videoId) {
      return null
    }

    return (
      <MuxPlayer
        className="w-full shadow-lg"
        streamType="on-demand"
        playbackId={playbackId}
        metadata={{
          video_id: videoId,
          video_title: video.title,
        }}
        style={{ aspectRatio: 16 / 9 }}
      />
    )
  }

  return (
    <div className="aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Video player not available</p>
    </div>
  )
}
