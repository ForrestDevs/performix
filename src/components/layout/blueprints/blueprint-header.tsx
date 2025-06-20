'use client'

import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { Download, Star, Clock } from 'lucide-react'

interface BlueprintHeaderProps {
  title: string
  description?: string
  isPaid: boolean
  price?: number
  createdAt?: string
  downloadCount?: number
}

export default function BlueprintHeader({
  title,
  description,
  isPaid,
  price,
  createdAt,
  downloadCount = 0,
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
      className="mb-8"
    >
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center space-x-2 text-sm text-gray-500 mb-4"
      >
        <span>Resources</span>
        <span>/</span>
        <span>Blueprints</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Space_Grotesk']"
      >
        {title}
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-gray-600 mb-6 max-w-4xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Metadata Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center gap-6 mb-6"
      >
        {/* Pricing Badge */}
        <div className="flex items-center gap-2">
          {isPaid ? (
            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-semibold">
              Premium Blueprint
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 px-4 py-2 text-sm font-semibold">
              Free Blueprint
            </Badge>
          )}

          {isPaid && price && <span className="text-2xl font-bold text-gray-900">${price}</span>}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {createdAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{downloadCount.toLocaleString()} downloads</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>4.8 rating</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
