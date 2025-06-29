'use client'

import { motion } from 'motion/react'
import RichText from '@/components/RichText'
import { SerializedEditorState } from 'lexical'
import { BookOpen } from 'lucide-react'

interface BlueprintContentProps {
  richText?: SerializedEditorState
}

export default function BlueprintContent({ richText }: BlueprintContentProps) {
  if (!richText) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="relative"
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-lg flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Blueprint Details</h2>
        </div>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#0891B2] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
        >
          <RichText data={richText} />
        </motion.div>
      </div>
    </motion.div>
  )
}
