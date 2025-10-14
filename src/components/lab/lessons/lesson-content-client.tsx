'use client'

import { Media, Video } from '@/payload-types'
import { Download } from 'lucide-react'
import { VideoCard } from '../video-card'
import { DownloadCard } from '../download-card'
import { useState } from 'react'
import AccessRequiredModal from './access-required-modal'

interface LessonContentClientProps {
  canViewContent: boolean
  downloads: Media[] | null
  videos: Video[] | undefined
}

export function LessonContentClient(props: LessonContentClientProps) {
  const { canViewContent, downloads, videos } = props

  const [accessModelOpen, setAccessModelOpen] = useState(false)

  const handleAccessRequired = () => {
    setAccessModelOpen(true)
  }

  return (
    <>
      <div className="flex flex-col space-y-6">
        {videos && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Videos</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {videos.map((video: Video, index: number) => (
                <div key={index} className="aspect-video w-full">
                  <p className="text-sm text-gray-500 mb-2">{video.title}</p>
                  <VideoCard
                    video={video}
                    canView={canViewContent}
                    onAccessRequired={handleAccessRequired}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {downloads && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Download className="h-5 w-5" />
              Downloads
            </h2>
            <div className="grid gap-3">
              {downloads.map((download: Media, index: number) => (
                <DownloadCard
                  key={index}
                  file={download}
                  canDownload={canViewContent}
                  onAccessRequired={handleAccessRequired}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <AccessRequiredModal
        onClose={() => setAccessModelOpen(false)}
        isOpen={accessModelOpen}
        title="test"
      />
    </>
  )
}
