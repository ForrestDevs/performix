import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/utilities/getPayload'

import { PostHero } from '@/payload/heros/PostHero/index'

import { generateMeta } from '@/lib/utilities/generateMeta'
import { ARTICLE_SLUG, POST_SLUG } from '@/payload/collections/constants'
// import { queryPostBySlug } from '@/lib/utilities/queryBySlug'
// import { PostCard } from '@/components/marketing/blog/post-card'
import RichText from '@/components/RichText'
import { SerializedEditorState } from 'lexical'

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

  //   const relatedPosts = post.relatedPosts?.filter((post) => typeof post === 'object')

  //   if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      {/* <PayloadRedirects disableNotFound url={url} /> */}
      {post && <PostHero post={post} />}
      <div className="flex flex-col gap-4 pt-8 max-w-7xl mx-auto">
        <RichText data={post?.content as SerializedEditorState} />
      </div>
    </article>
  )
}

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//   const { slug } = await params
//   const post = await queryPostBySlug({ slug })

//   return generateMeta({ doc: post, collectionSlug: ARTICLE_SLUG })
// }
