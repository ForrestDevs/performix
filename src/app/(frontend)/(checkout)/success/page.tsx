import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/data/auth'
import SuccessPageClient from './success-client'

type Params = Promise<{ searchParams: { session_id?: string } }>

interface SearchParams {
  session_id?: string
}

export default async function SuccessPage({ searchParams }: { searchParams: Params }) {
  // Parse search params
  const params = await searchParams
  const { session_id } = params as unknown as SearchParams

  // Validate required parameters
  if (!session_id) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<SuccessSkeleton />}>
          <SuccessPageClient sessionId={session_id} />
        </Suspense>
      </div>
    </div>
  )
}

function SuccessSkeleton() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {/* Success Icon Skeleton */}
      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse" />

      {/* Title Skeleton */}
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse" />

      {/* Description Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8 animate-pulse" />

      {/* Order Details Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1 text-left">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex space-x-4 justify-center">
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
      </div>
    </div>
  )
}
