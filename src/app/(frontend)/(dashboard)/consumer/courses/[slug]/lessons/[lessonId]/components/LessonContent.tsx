'use client'

import { Lesson } from '@/payload-types'
import RichText from '@/components/RichText'

interface LessonContentProps {
  lesson: Lesson
}

export function LessonContent({ lesson }: LessonContentProps) {
  const { content } = lesson

  if (content.primaryContent.type === 'video') {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={content.primaryContent.videoData?.videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    )
  }

  

  if (content.primaryContent.type === 'rich_text') {
    return (
      <div className="prose prose-blue max-w-none">
        <RichText data={content.primaryContent.richTextData!} />
      </div>
    )
  }

  return null
}
