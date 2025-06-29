'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { MindNode } from '@/lib/data/mind-map'
import { cn } from '@/lib/utilities/ui'

interface MindMapNodeProps {
  node: MindNode
  index: number
  isActive?: boolean
  scale?: number
}

export function MindMapNode({ node, index, isActive, scale = 1 }: MindMapNodeProps) {
  const getNodeSize = () => {
    switch (node.type) {
      case 'course':
        return { width: 200, height: 200 }
      case 'module':
        return { width: 160, height: 160 }
      case 'volume':
        return { width: 120, height: 120 }
      default:
        return { width: 100, height: 100 }
    }
  }

  const getGradient = () => {
    const color = node.color || '#8B5CF6'
    return `linear-gradient(135deg, ${color}, ${color}CC)`
  }

  const { width, height } = getNodeSize()
  const size = Math.min(width, height) * scale

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: (node.position?.x || 0) * scale,
        y: (node.position?.y || 0) * scale,
      }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
      }}
      whileTap={{ scale: 0.95 }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{
        left: '50%',
        top: '50%',
      }}
    >
      <Link href={`/mind/${node.id}`} className="block">
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: getGradient(),
              width: size + 20,
              height: size + 20,
              left: -10,
              top: -10,
            }}
          />

          {/* Main node circle */}
          <motion.div
            className={cn(
              'relative rounded-full flex flex-col items-center justify-center text-white font-bold shadow-2xl border-4 border-white/20',
              'backdrop-blur-sm transition-all duration-300',
              isActive && 'ring-4 ring-white/50',
            )}
            style={{
              background: getGradient(),
              width: size,
              height: size,
              fontSize:
                node.type === 'course' ? '2rem' : node.type === 'module' ? '1.5rem' : '1rem',
            }}
          >
            {/* Icon */}
            <div className="text-2xl mb-1">{node.icon}</div>

            {/* Title */}
            <div className="text-center px-2 leading-tight">
              <div className="text-xs font-semibold opacity-90 mb-1">{node.type.toUpperCase()}</div>
              <div className={cn('font-bold', node.type === 'course' ? 'text-sm' : 'text-xs')}>
                {node.title}
              </div>
            </div>

            {/* Pulse animation for central node */}
            {node.type === 'course' && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>

          {/* Hover tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap backdrop-blur-sm border border-white/10 shadow-xl"
            style={{ zIndex: 100 }}
          >
            {node.description}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-t border-white/10" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
