'use client'

import { Suspense } from 'react'
import { ResourceViewModeProvider } from './view-mode-context'
import ResourcesViewControls from './resources-view-controls'
import UnifiedResourcesGrid from './resources-list'
import type { Resource } from '@/lib/types/resources'

interface ResourcesClientWrapperProps {
  resources: Resource[]
  totalCount: number
  showLeadMagnet?: boolean
}

export default function ResourcesClientWrapper({
  resources,
  totalCount,
  showLeadMagnet = false,
}: ResourcesClientWrapperProps) {
  return (
    <ResourceViewModeProvider defaultViewMode="grid">
      {/* View Controls */}
      <Suspense fallback={<div className="h-16 bg-gray-100 rounded-lg animate-pulse mb-8" />}>
        <ResourcesViewControls totalCount={totalCount} />
      </Suspense>

      {/* Resources Grid/List */}
      <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg animate-pulse" />}>
        <UnifiedResourcesGrid resources={resources} showLeadMagnet={showLeadMagnet} />
      </Suspense>
    </ResourceViewModeProvider>
  )
}
