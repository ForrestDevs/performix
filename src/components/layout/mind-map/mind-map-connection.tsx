'use client'

import { motion } from 'motion/react'
import { MindNode } from '@/lib/data/mind-map'

interface MindMapConnectionProps {
  fromNode: MindNode
  toNode: MindNode
  scale?: number
  index: number
}

export function MindMapConnection({ fromNode, toNode, scale = 1, index }: MindMapConnectionProps) {
  // Get node sizes based on type
  const getNodeRadius = (node: MindNode) => {
    switch (node.type) {
      case 'course':
        return 100 * scale // 200px diameter = 100px radius
      case 'module':
        return 80 * scale // 160px diameter = 80px radius
      case 'volume':
        return 60 * scale // 120px diameter = 60px radius
      default:
        return 50 * scale // 100px diameter = 50px radius
    }
  }

  const fromPos = {
    x: (fromNode.position?.x || 0) * scale,
    y: (fromNode.position?.y || 0) * scale,
  }

  const toPos = {
    x: (toNode.position?.x || 0) * scale,
    y: (toNode.position?.y || 0) * scale,
  }

  // Calculate the direction vector
  const dx = toPos.x - fromPos.x
  const dy = toPos.y - fromPos.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // If nodes are at the same position, don't draw connection
  if (distance < 1) return null

  // Normalize direction vector
  const dirX = dx / distance
  const dirY = dy / distance

  // Calculate connection start and end points (edge of circles, not centers)
  const fromRadius = getNodeRadius(fromNode)
  const toRadius = getNodeRadius(toNode)

  const startX = fromPos.x + dirX * fromRadius
  const startY = fromPos.y + dirY * fromRadius
  const endX = toPos.x - dirX * toRadius
  const endY = toPos.y - dirY * toRadius

  // Create a curved path with control points
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2

  // Add perpendicular offset for curve (adjust based on distance)
  const curveStrength = Math.min(distance * 0.2, 100)
  const perpX = -dirY * curveStrength
  const perpY = dirX * curveStrength

  const controlX = midX + perpX
  const controlY = midY + perpY

  const pathData = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      {/* Glow effect */}
      <motion.path
        d={pathData}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="8"
        fill="none"
        className="blur-sm"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: index * 0.05 + 0.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      {/* Main connection line */}
      <motion.path
        d={pathData}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="transition-all duration-300 hover:stroke-white/70"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: index * 0.05 + 0.2,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      {/* Animated particle effect */}
      <motion.circle
        r="3"
        fill="rgba(255, 255, 255, 0.8)"
        className="drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          x: [startX, controlX, endX],
          y: [startY, controlY, endY],
        }}
        transition={{
          delay: index * 0.1 + 0.8,
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />
    </motion.g>
  )
}
