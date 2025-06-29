'use client'

import { BookOpen } from 'lucide-react'
import type { Resource } from '@/lib/types/resources'
import { useResourceViewMode } from './view-mode-context'
import { ResourceListCard } from './cards/resource-list-card'
import { ResourceGridCard } from './cards/resource-grid-card'

interface ResourcesListProps {
  resources: Resource[]
  showLeadMagnet?: boolean
}

export default function ResourcesList({ resources, showLeadMagnet = false }: ResourcesListProps) {
  const { viewMode } = useResourceViewMode()

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {resources.map((resource) => (
          <ResourceListCard
            key={`${resource.type}-${resource.id}`}
            resource={resource}
            showLeadMagnet={showLeadMagnet}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {resources.map((resource) => (
        <ResourceGridCard
          key={`${resource.type}-${resource.id}`}
          resource={resource}
          showLeadMagnet={showLeadMagnet}
        />
      ))}
    </div>
  )
}
