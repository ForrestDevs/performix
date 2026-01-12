import { getCurrentUser } from '@/lib/data/auth'
import { getPayload } from '@/lib/utilities/getPayload'
import { Media } from '@/payload-types'
import { BLUEPRINTS_SLUG, ENROLLMENTS_SLUG } from '@/payload/collections/constants'
import { SerializedEditorState } from 'lexical'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Component imports
import BlueprintPageClient from '@/components/layout/blueprints/blueprint-page-client'
import { JsonLdScript, getBreadcrumbSchema, getProductSchema } from '@/lib/seo/jsonld'

type Params = Promise<{ slug: string | undefined }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: BLUEPRINTS_SLUG,
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const blueprint = docs[0]

  if (!blueprint) {
    return {
      title: 'Blueprint Not Found',
      description: 'The requested blueprint could not be found.',
    }
  }

  const thumbnailUrl =
    blueprint.thumbnail && typeof blueprint.thumbnail === 'object'
      ? (blueprint.thumbnail as Media).url
      : undefined
  const fullThumbnailUrl = thumbnailUrl?.startsWith('http')
    ? thumbnailUrl
    : thumbnailUrl
      ? `https://www.performix.ca${thumbnailUrl}`
      : 'https://www.performix.ca/opengraph-image.png'

  return {
    title: `${blueprint.title} - Hockey Training Blueprint`,
    description:
      blueprint.description ||
      `Get the ${blueprint.title} training blueprint. Expert hockey development resources from Performix.`,
    keywords: [
      blueprint.title || '',
      'hockey blueprint',
      'hockey training',
      'hockey development',
      'training guide',
    ].filter(Boolean),
    openGraph: {
      title: `${blueprint.title} | Performix Blueprint`,
      description:
        blueprint.description ||
        `Expert hockey training blueprint from Performix.`,
      type: 'website',
      url: `https://www.performix.ca/blueprints/${slug}`,
      images: [
        {
          url: fullThumbnailUrl,
          width: 1200,
          height: 630,
          alt: blueprint.title || 'Performix Blueprint',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blueprint.title} | Performix Blueprint`,
      description: blueprint.description || `Expert hockey training blueprint.`,
      images: [fullThumbnailUrl],
    },
    alternates: {
      canonical: `https://www.performix.ca/blueprints/${slug}`,
    },
  }
}

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

  let isEnrolled = false
  if (user) {
    try {
      const res = await payload.find({
        collection: ENROLLMENTS_SLUG,
        where: {
          and: [
            {
              user: {
                equals: user?.id,
              },
            },
            {
              enrolledBlueprint: {
                equals: blueprint.id,
              },
            },
            {
              type: {
                equals: 'blueprint',
              },
            },
          ],
        },
        limit: 1,
      })
      isEnrolled = res.docs.length > 0
    } catch (error) {
      console.error(error)
    }
  }

  const thumbnailUrl =
    blueprint.thumbnail && typeof blueprint.thumbnail === 'object'
      ? (blueprint.thumbnail as Media).url
      : undefined
  const fullThumbnailUrl = thumbnailUrl?.startsWith('http')
    ? thumbnailUrl
    : thumbnailUrl
      ? `https://www.performix.ca${thumbnailUrl}`
      : undefined

  const productJsonLd = {
    '@context': 'https://schema.org',
    ...getProductSchema({
      name: blueprint.title || 'Training Blueprint',
      description: blueprint.description || '',
      url: `https://www.performix.ca/blueprints/${slug}`,
      image: fullThumbnailUrl,
      price: blueprint.isPaid ? blueprint.price || 0 : 0,
      priceCurrency: 'CAD',
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Resources', url: 'https://www.performix.ca/resources' },
      { name: blueprint.title || 'Blueprint', url: `https://www.performix.ca/blueprints/${slug}` },
    ]),
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

  return (
    <>
      <JsonLdScript data={productJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <BlueprintPageClient
        blueprint={blueprintData}
        isAuthenticated={!!user}
        user={user || null}
        isEnrolled={isEnrolled}
      />
    </>
  )
}
