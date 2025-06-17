import React, { Suspense } from 'react'
import { FeaturedMentorsClient } from './client'
import { FeaturedMentorsLoading } from './loading'
import { getFeaturedMentors } from '@/lib/data/mentors'

export async function FeaturedMentorsSection() {
  const mentors = await getFeaturedMentors()

  return (
    <Suspense fallback={<FeaturedMentorsLoading />}>
      <FeaturedMentorsClient mentors={mentors} />
    </Suspense>
  )
}
