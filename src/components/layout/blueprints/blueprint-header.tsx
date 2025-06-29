'use client'

import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { Download, Star, Clock, Check } from 'lucide-react'
import { Media as MediaType } from '@/payload-types'
import Image from 'next/image'
import { Media as MediaComponent } from '@/components/Media'

interface BlueprintHeaderProps {
  title: string
  description?: string
  isPaid: boolean
  price?: number
  createdAt?: string
  thumbnail?: MediaType | number
  isEnrolled: boolean
}

export default function BlueprintHeader({
  title,
  description,
  isPaid,
  price,
  createdAt,
  thumbnail,
  isEnrolled,
}: BlueprintHeaderProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-12"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
      >
        <span>Resources</span>
        <span>/</span>
        <span>Blueprints</span>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{title}</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 xl:col-span-9">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 font-['Space_Grotesk'] leading-tight"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-3">
              {isPaid ? (
                <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                  Premium Blueprint
                </Badge>
              ) : (
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                  Free Blueprint
                </Badge>
              )}

              {isEnrolled && (
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg">
                  <Check className="h-3 w-3 mr-2" />
                  Enrolled
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              {createdAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(createdAt)}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {thumbnail && (
          <div className="lg:col-span-4 xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0891B2]/10 to-[#8B5CF6]/10" />

                <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
                  <MediaComponent
                    resource={thumbnail}
                    alt={title}
                    fill
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div className="absolute -inset-4 bg-gradient-to-r from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
