'use client'

import './youtube-viewer.scss'
import { useFormFields } from '@payloadcms/ui'

export function YoutubeViewerField() {
  const { youtubeUrl } = useFormFields(([fields]) => ({
    youtubeUrl: fields.youtubeUrl?.value as string,
  }))

  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null

    // Handle different YouTube URL formats
    const videoIdRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(videoIdRegex)

    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`
    }

    return null
  }

  const embedUrl = getYouTubeEmbedUrl(youtubeUrl)

  if (!embedUrl) {
    return (
      <div className="youtube-viewer">
        <p>Please enter a valid YouTube URL to preview the video.</p>
      </div>
    )
  }

  return (
    <div className="youtube-viewer">
      <p className="youtube-viewer__preview-label">Preview</p>
      <div className="youtube-viewer__preview">
        <iframe
          src={embedUrl}
          width="100%"
          height="400"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video Preview"
          style={{ borderRadius: '8px' }}
        />
      </div>
    </div>
  )
}
