import React from 'react'
import { getPayload } from '@/lib/utilities/getPayload'
import { ARTICLE_SLUG } from '@/payload/collections/constants'
import RichText from '@/components/RichText'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { formatDateTime } from '@/lib/utilities/formatDateTime'
import { Clock } from 'lucide-react'
import { Metadata } from 'next'

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

  return {
    title: post?.title,
    description: post?.meta?.description,

    openGraph: {
      title: post?.title,
      description: post?.meta?.description || '',
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

  return (
    <article className="min-h-screen bg-white pb-16">
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
