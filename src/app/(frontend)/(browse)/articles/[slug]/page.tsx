import React from 'react'
import { getPayload } from '@/lib/utilities/getPayload'
import { PostHero } from '@/payload/heros/PostHero/index'
import { ARTICLE_SLUG } from '@/payload/collections/constants'
import RichText from '@/components/RichText'
import { SerializedEditorState } from 'lexical'
import { PayloadRedirects } from '@/components/PayloadRedirects'

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

type Params = Promise<{ slug: string | undefined }>

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params
  const url = '/articles/' + slug
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: ARTICLE_SLUG,
    where: { slug: { equals: slug } },
    depth: 3,
    limit: 2,
  })

  const post = docs[0]

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      {post && <PostHero post={post} />}
      <div className="flex flex-col gap-4 pt-8 max-w-7xl mx-auto">
        <RichText data={post?.content as SerializedEditorState} />
      </div>
    </article>
  )
}
