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
        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            data={post?.content as SerializedEditorState}
            enableGutter={false}
          />
        </div>

        {/* {relatedPosts.length > 0 && (
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 items-stretch">
              {relatedPosts.map((doc, index) => (
                <PostCard key={index} doc={doc} showCategories />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </article>
  )
}

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//   const { slug } = await params
//   const post = await queryPostBySlug({ slug })

//   return generateMeta({ doc: post, collectionSlug: ARTICLE_SLUG })
// }
