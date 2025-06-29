'use client'

import { useState } from 'react'
import { UnifiedResourcesGrid, LeadMagnetModal } from './index'
import type { Resource } from '@/lib/types/resources'

interface ResourcesWithLeadMagnetProps {
  resources: Resource[]
  viewMode?: 'grid' | 'list'
}

export default function ResourcesWithLeadMagnet({
  resources,
  viewMode = 'grid',
}: ResourcesWithLeadMagnetProps) {
  const [leadMagnetState, setLeadMagnetState] = useState({
    isOpen: false,
    resource: null as Resource | null,
  })

  const handleResourceClick = (resource: Resource) => {
    // Only show lead magnet for paid content or premium resources
    if (resource.isPaid) {
      setLeadMagnetState({
        isOpen: true,
        resource,
      })
      return false // Prevent navigation
    }
    return true // Allow normal navigation
  }

  const handleLeadMagnetSuccess = (data: any) => {
    console.log('Lead magnet form submitted:', data)

    // Here you would:
    // 1. Save the lead to your database
    // 2. Send welcome email
    // 3. Grant access to the premium content
    // 4. Redirect to the content or show success message

    // For now, just redirect to the resource
    if (leadMagnetState.resource) {
      window.location.href = leadMagnetState.resource.url
    }
  }

  return (
    <>
      <UnifiedResourcesGrid resources={resources} showLeadMagnet={true} />

      <LeadMagnetModal
        isOpen={leadMagnetState.isOpen}
        onClose={() => setLeadMagnetState({ isOpen: false, resource: null })}
        onSuccess={handleLeadMagnetSuccess}
        resourceTitle={leadMagnetState.resource?.title}
        resourceType={leadMagnetState.resource?.type}
        title="Unlock Premium Hockey Content"
        description="Get instant access to our exclusive training resources used by D1+ players"
        benefits={[
          'Access to 50+ premium training blueprints',
          'Exclusive video content from D1+ mentors',
          'Weekly training tips and strategies',
          'Priority access to new resources',
          'Community of serious hockey players',
        ]}
      />
    </>
  )
}
