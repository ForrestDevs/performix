import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import CheckoutPageClient from './checkout-client'
import { getPayload } from '@/lib/utilities/getPayload'
import { BLUEPRINTS_SLUG, COURSES_SLUG, PLANS_SLUG } from '@/payload/collections/constants'
import { ProductData } from '@/lib/types/checkout'
import { headers } from 'next/headers'
// import CheckoutPageClient from './checkout-client'

type SearchParams = Promise<{
  t?: string // type: blueprint, course, plan
  pid?: string // product id (blueprint, course, plan)
}>

// Parse search params
// Fetch correct product data -> Includes a Stripe Product ID and Current Price ID
// Pass product data to the client component

export default async function CheckoutPage({ searchParams }: { searchParams: SearchParams }) {
  const payload = await getPayload()
  const user = await payload.auth({
    headers: await headers(),
  })

  if (!user) {
    redirect('/')
  }

  const { t, pid } = await searchParams

  // Validate required parameters
  if (!t || !pid) {
    redirect('/')
  }

  if (t !== 'blueprint' && t !== 'course' && t !== 'plan') {
    redirect('/')
  }
  // Fetch product data from Payload
  let product: ProductData | null = null
  try {
    const payload = await getPayload()

    if (t === 'blueprint') {
      const result = await payload.findByID({
        collection: BLUEPRINTS_SLUG,
        id: pid,
        depth: 3,
      })
      product = {
        id: String(result.id),
        slug: result.slug || '',
        type: 'blueprints',
        title: result.title || '',
        description: result.description || '',
        price: result.price || 0,
        thumbnail: result.thumbnail,
        stripeProductId: result.stripeProductId || '',
        stripePriceId: result.stripePriceId || '',
        mode: 'payment',
      }
    } else if (t === 'course') {
      const result = await payload.findByID({
        collection: COURSES_SLUG,
        id: pid,
        depth: 1,
      })
      product = {
        id: String(result.id),
        slug: result.slug || '',
        type: 'courses',
        title: result.title || '',
        description: result.description || '',
        price: result.price || 0,
        thumbnail: result.thumbnail,
        stripeProductId: result.stripeProductId || '',
        stripePriceId: result.stripePriceId || '',
        mode: 'payment',
      }
    } else if (t === 'plan') {
      const result = await payload.findByID({
        collection: PLANS_SLUG,
        id: pid,
        depth: 1,
      })
      product = {
        id: String(result.id),
        slug: result.slug || '',
        type: 'plans',
        title: result.title || '',
        description: result.description || '',
        price: result.price || 0,
        thumbnail: result.thumbnail,
        stripeProductId: result.stripeProductId || '',
        stripePriceId: result.stripePriceId || '',
        mode: 'subscription',
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    redirect('/')
  }

  // Check if product exists and is paid
  if (!product) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background container">
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutPageClient
          product={product}
          customerId={user.user?.stripeCustomerId || ''}
          userId={user.user?.id}
        />
      </Suspense>
    </div>
  )
}

function CheckoutSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>

      {/* Product Details Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Order Summary Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse" />
          </div>
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-1/6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button Skeleton */}
      <div className="h-12 bg-gray-200 rounded w-full animate-pulse" />
    </div>
  )
}
