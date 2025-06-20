'use client'

import { motion } from 'motion/react'
import { Media } from '@/payload-types'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
interface BlueprintThumbnailProps {
  thumbnail?: Media | string
  title: string
  isAuthenticated: boolean
}

export default function BlueprintThumbnail({
  thumbnail,
  title,
  isAuthenticated,
}: BlueprintThumbnailProps) {
  const getThumbnailUrl = () => {
    if (typeof thumbnail === 'string') return thumbnail
    if (typeof thumbnail === 'object' && thumbnail?.url) return thumbnail.url
    return null
  }

  const thumbnailUrl = getThumbnailUrl()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="relative mb-6 group"
    >
      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={
              typeof thumbnail === 'object' && thumbnail?.alt ? thumbnail.alt : `${title} thumbnail`
            }
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={100}
            height={100}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No preview available</p>
            </div>
          </div>
        )}

        {/* Overlay gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Blur overlay for unauthenticated users */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute inset-0 backdrop-blur-sm bg-white/20 rounded-xl"
        />
      )}
    </motion.div>
  )
}
