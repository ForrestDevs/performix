import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { JsonLdScript, getArticleSchema, getBreadcrumbSchema } from '@/lib/seo/jsonld'
import { formatDateTime } from '@/lib/utilities/formatDateTime'
import { getPayload } from '@/lib/utilities/getPayload'
import { ArticleTag, Media } from '@/payload-types'
import { ARTICLE_SLUG } from '@/payload/collections/constants'
import { Clock } from 'lucide-react'
import type { Metadata } from 'next'

type Params = Promise<{ slug: string | undefined }>

export async function generateStaticParams() {
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: ARTICLE_SLUG,
    draft: false,
    overrideAccess: false,
  })

  const postSlugs = docs.map((post) => {
    return {
      slug: post.slug ?? '',
    }
  })

  return postSlugs
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params

  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: ARTICLE_SLUG,
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    }
  }

  const imageUrl =
    post.meta?.image && typeof post.meta.image === 'object'
      ? (post.meta.image as Media).url
      : undefined
  const fullImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
      ? `https://www.performix.ca${imageUrl}`
      : 'https://www.performix.ca/opengraph-image.png'

  const tags =
    post.tags
      ?.map((tag) => (typeof tag === 'object' ? (tag as ArticleTag).title : null))
      .filter(Boolean) || []

  return {
    title: post?.title,
    description: post?.meta?.description || `Read ${post?.title} on Performix`,
    keywords: ['hockey article', 'hockey tips', ...tags] as string[],
    openGraph: {
      title: post?.title || 'Article',
      description: post?.meta?.description || '',
      type: 'article',
      url: `https://www.performix.ca/articles/${slug}`,
      publishedTime: post?.publishedAt || undefined,
      modifiedTime: post?.updatedAt || undefined,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: post?.title || 'Article',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title || 'Article',
      description: post?.meta?.description || '',
      images: [fullImageUrl],
    },
    alternates: {
      canonical: `https://www.performix.ca/articles/${slug}`,
    },
  }
}

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params
  const url = '/articles/' + slug

  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: ARTICLE_SLUG,
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 1,
  })

  const post = docs[0]

  if (!post) return <PayloadRedirects url={url} />

  const imageUrl =
    post.meta?.image && typeof post.meta.image === 'object'
      ? (post.meta.image as Media).url
      : undefined
  const fullImageUrl = imageUrl?.startsWith('http')
    ? imageUrl
    : imageUrl
      ? `https://www.performix.ca${imageUrl}`
      : undefined

  const tags =
    post.tags
      ?.map((tag) => (typeof tag === 'object' ? (tag as ArticleTag).title : null))
      .filter((tag): tag is string => tag !== null) || []

  const articleJsonLd = {
    '@context': 'https://schema.org',
    ...getArticleSchema({
      headline: post.title || 'Article',
      description: post.meta?.description || '',
      url: `https://www.performix.ca/articles/${slug}`,
      image: fullImageUrl,
      datePublished: post.publishedAt || undefined,
      dateModified: post.updatedAt || undefined,
      keywords: tags,
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    ...getBreadcrumbSchema([
      { name: 'Home', url: 'https://www.performix.ca' },
      { name: 'Resources', url: 'https://www.performix.ca/resources' },
      { name: post.title || 'Article', url: `https://www.performix.ca/articles/${slug}` },
    ]),
  }

  return (
    <article className="min-h-screen bg-white pb-16">
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />

      <header className="container py-8 md:py-12 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {post.tags?.map((tag, index) => {
            if (typeof tag === 'object' && tag !== null) {
              const { title: tagTitle } = tag
              const titleToUse = tagTitle || 'Untitled tag'
              return (
                <span
                  key={index}
                  className="bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-300 text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1 shadow transition hover:from-blue-800 hover:to-cyan-300 text-white"
                >
                  {titleToUse}
                </span>
              )
            }
            return null
          })}
        </div>

        <h1 className="mb-2 text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-700">
          {post.title}
        </h1>

        {post.publishedAt && (
          <div className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <time dateTime={post.publishedAt} className="text-sm lg:text-base text-gray-500">
              {formatDateTime(post.publishedAt)}
            </time>
          </div>
        )}
      </header>

      <div className="container">
        <RichText data={post.content} enableGutter={false} />
      </div>
    </article>
  )
}
