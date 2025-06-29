'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { SerializedEditorState } from 'lexical'
import { Media, User } from '@/payload-types'

// Component imports
import BlueprintHeader from './blueprint-header'
import BlueprintContent from './blueprint-content'
import BlueprintThumbnail from './blueprint-thumbnail'
import DownloadableFiles from './downloadable-files'
import VideosList from './videos-list'
import AuthModal from './auth-modal'
import PurchaseButton from './purchase-button'

interface Video {
  title: string
  url: string
  duration?: string
  thumbnail?: string
}

interface BlueprintData {
  id: string
  title: string
  description: string
  richText?: SerializedEditorState
  thumbnail?: Media | number
  files: Media[]
  videos: Video[]
  isPaid: boolean
  price: number
  createdAt: string
  updatedAt: string
}

interface BlueprintPageClientProps {
  blueprint: BlueprintData
  isAuthenticated: boolean
  user: User | null
  isEnrolled: boolean
}

export default function BlueprintPageClient({
  blueprint,
  isAuthenticated,
  user,
  isEnrolled,
}: BlueprintPageClientProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleAuthRequired = () => {
    setIsAuthModalOpen(true)
  }

  const isLocked = blueprint.isPaid && !isEnrolled

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0891B2]/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent rounded-full translate-y-32 -translate-x-32" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <BlueprintHeader
          title={blueprint.title}
          description={blueprint.description}
          isPaid={blueprint.isPaid}
          price={blueprint.price}
          createdAt={blueprint.createdAt}
          thumbnail={blueprint.thumbnail}
          isEnrolled={isEnrolled}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <BlueprintContent richText={blueprint.richText} />

            {blueprint.videos && blueprint.videos.length > 0 && (
              <VideosList
                videos={blueprint.videos}
                isAuthenticated={isAuthenticated}
                onAuthRequired={handleAuthRequired}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="sticky top-8 space-y-6"
            >
              {blueprint.files && blueprint.files.length > 0 && (
                <DownloadableFiles
                  files={blueprint.files}
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={handleAuthRequired}
                  isLocked={isLocked}
                />
              )}

              <PurchaseButton
                blueprintId={blueprint.id}
                price={blueprint.price}
                isPaid={blueprint.isPaid}
                isAuthenticated={isAuthenticated}
                isEnrolled={isEnrolled}
                userId={user?.id || undefined}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        blueprintTitle={blueprint.title}
      />
    </div>
  )
}
