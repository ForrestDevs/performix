'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { SerializedEditorState } from 'lexical'
import { Media } from '@/payload-types'

// Component imports
import BlueprintHeader from './blueprint-header'
import BlueprintContent from './blueprint-content'
import BlueprintThumbnail from './blueprint-thumbnail'
import DownloadableFiles from './downloadable-files'
import VideosList from './videos-list'
import AuthModal from './auth-modal'

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
  thumbnail?: Media | string
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
}

export default function BlueprintPageClient({
  blueprint,
  isAuthenticated,
}: BlueprintPageClientProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleAuthRequired = () => {
    setIsAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0891B2]/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent rounded-full translate-y-32 -translate-x-32" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <BlueprintHeader
          title={blueprint.title}
          description={blueprint.description}
          isPaid={blueprint.isPaid}
          price={blueprint.price}
          createdAt={blueprint.createdAt}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Blueprint Content */}
            <BlueprintContent richText={blueprint.richText} isAuthenticated={isAuthenticated} />

            {/* Videos */}
            {blueprint.videos && blueprint.videos.length > 0 && (
              <VideosList
                videos={blueprint.videos}
                isAuthenticated={isAuthenticated}
                onAuthRequired={handleAuthRequired}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="sticky top-8 space-y-6"
            >
              {/* Thumbnail */}
              <BlueprintThumbnail
                thumbnail={blueprint.thumbnail}
                title={blueprint.title}
                isAuthenticated={isAuthenticated}
              />

              {/* Files */}
              {blueprint.files && blueprint.files.length > 0 && (
                <DownloadableFiles
                  files={blueprint.files}
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={handleAuthRequired}
                />
              )}

              {/* Additional Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Blueprint</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium text-gray-900">
                      {blueprint.isPaid ? 'Premium' : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Files:</span>
                    <span className="font-medium text-gray-900">
                      {blueprint.files.length} download{blueprint.files.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Videos:</span>
                    <span className="font-medium text-gray-900">
                      {blueprint.videos.length} tutorial{blueprint.videos.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(blueprint.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        blueprintTitle={blueprint.title}
      />
    </div>
  )
}
