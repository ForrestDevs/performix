'use client'

import './loom-viewer.scss'
import { useFormFields } from '@payloadcms/ui'

export function LoomViewerField() {
  const { loomUrl } = useFormFields(([fields]) => ({
    loomUrl: fields.loomUrl?.value as string,
  }))

  const getLoomEmbedUrl = (url: string): string | null => {
    if (!url) return null

    // Handle different Loom URL formats
    // Examples:
    // https://www.loom.com/share/VIDEO_ID
    // https://loom.com/share/VIDEO_ID
    const videoIdRegex = /(?:loom\.com\/share\/)([a-zA-Z0-9]+)/
    const match = url.match(videoIdRegex)

    if (match && match[1]) {
      return `https://www.loom.com/embed/${match[1]}`
    }

    return null
  }

  const embedUrl = getLoomEmbedUrl(loomUrl)

  if (!embedUrl) {
    return (
      <div className="loom-viewer">
        <p>Please enter a valid Loom URL to preview the video.</p>
      </div>
    )
  }

  return (
    <div className="loom-viewer">
      <p className="loom-viewer__preview-label">Preview</p>
      <div className="loom-viewer__preview">
        <iframe
          src={embedUrl}
          width="100%"
          height="400"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Loom Video Preview"
          style={{ borderRadius: '8px' }}
        />
      </div>
    </div>
  )
}
