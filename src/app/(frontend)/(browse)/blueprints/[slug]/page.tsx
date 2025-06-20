import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/utilities/getPayload'
import { generateMeta } from '@/lib/utilities/generateMeta'
import { BLUEPRINTS_SLUG } from '@/payload/collections/constants'
import { SerializedEditorState } from 'lexical'
import { Media } from '@/payload-types'
import { getCurrentUser } from '@/lib/data/auth'
import { notFound } from 'next/navigation'

// Component imports
import BlueprintPageClient from '@/components/layout/blueprints/blueprint-page-client'

type Params = Promise<{ slug: string | undefined }>

export default async function Blueprint({ params }: { params: Params }) {
  const user = await getCurrentUser()
  const { slug } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: BLUEPRINTS_SLUG,
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  const blueprint = docs[0]

  if (!blueprint) {
    return notFound()
  }

  // Transform blueprint data for client components
  const blueprintData = {
    id: blueprint.id.toString(),
    title: blueprint.title || '',
    description: blueprint.description || '',
    richText: blueprint.richText as SerializedEditorState,
    thumbnail:
      typeof blueprint.thumbnail === 'object' && blueprint.thumbnail !== null
        ? blueprint.thumbnail
        : undefined,
    files: (blueprint.files || []).filter((file): file is Media => typeof file === 'object'),
    videos: (blueprint.videos || []).map((video: any) => ({
      title: video.title || '',
      url: video.url || '',
      duration: video.duration,
      thumbnail: video.thumbnail,
    })),
    isPaid: blueprint.isPaid || false,
    price: blueprint.price || 0,
    createdAt: blueprint.createdAt,
    updatedAt: blueprint.updatedAt,
  }

  return <BlueprintPageClient blueprint={blueprintData} isAuthenticated={!!user} />
}
