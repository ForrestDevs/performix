import { Video } from '@/payload-types'
import { extractYouTubeVideoId } from '@/lib/utilities/extract-youtube'
import { YoutubeVideo, LoomVideo } from '@/components/ui/video'
import MuxPlayer from '@mux/mux-player-react'

export function IntroVideo({ video }: { video: Video }) {
  const { source } = video

  if (source === 'youtube' && video.youtubeUrl) {
    const videoId = extractYouTubeVideoId(video.youtubeUrl)

    if (!videoId) {
      return null
    }

    return (
      <div className="aspect-video w-full">
        <YoutubeVideo id={videoId} title={video.title} className="w-full h-full rounded-lg" />
      </div>
    )
  }

  if (source === 'loom' && video.loomUrl) {
    return (
      <div className="w-full">
        <LoomVideo url={video.loomUrl} className="w-full h-full rounded-lg" />
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
        className="w-full rounded-lg shadow-lg"
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
