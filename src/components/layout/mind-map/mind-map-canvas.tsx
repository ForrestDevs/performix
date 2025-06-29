'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, PanInfo } from 'motion/react'
import { MindMapNode } from './mind-map-node'
import { MindMapConnection } from './mind-map-connection'
import { mindMapData, getNodeChildren } from '@/lib/data/mind-map'
import { Button } from '@/components/ui/button'
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react'

export function MindMapCanvas() {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Get all visible nodes (course + modules + volumes)
  const visibleNodes = mindMapData.filter(
    (node) => node.type === 'course' || node.type === 'module' || node.type === 'volume',
  )

  // Generate connections between parent and child nodes
  const connections = visibleNodes.reduce(
    (acc, node) => {
      if (node.parentId) {
        const parentNode = visibleNodes.find((n) => n.id === node.parentId)
        if (parentNode) {
          acc.push({ from: parentNode, to: node })
        }
      }
      return acc
    },
    [] as Array<{ from: (typeof visibleNodes)[0]; to: (typeof visibleNodes)[0] }>,
  )

  // Handle pan gestures
  const handlePan = (event: any, info: PanInfo) => {
    if (!isDragging) return
    setPosition((prev) => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y,
    }))
  }

  // Zoom controls
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev / 1.2, 0.3))
  }

  // Reset view
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
    controls.start({ x: 0, y: 0, scale: 1 })
  }

  // Fit to screen
  const handleFitToScreen = () => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const containerWidth = rect.width
    const containerHeight = rect.height

    // Calculate bounds of all nodes
    const bounds = visibleNodes.reduce(
      (acc, node) => {
        const x = node.position?.x || 0
        const y = node.position?.y || 0
        const radius = node.type === 'course' ? 120 : node.type === 'module' ? 100 : 80
        return {
          minX: Math.min(acc.minX, x - radius),
          maxX: Math.max(acc.maxX, x + radius),
          minY: Math.min(acc.minY, y - radius),
          maxY: Math.max(acc.maxY, y + radius),
        }
      },
      { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
    )

    const contentWidth = bounds.maxX - bounds.minX
    const contentHeight = bounds.maxY - bounds.minY

    const scaleX = (containerWidth * 0.8) / contentWidth
    const scaleY = (containerHeight * 0.8) / contentHeight
    const newScale = Math.min(scaleX, scaleY, 2)

    setScale(newScale)
    setPosition({ x: 0, y: 0 })
  }

  // Handle mouse wheel for zooming
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY * -0.01
        setScale((prev) => Math.max(0.3, Math.min(3, prev + delta)))
      }
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false })
      return () => canvas.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Auto-fit on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        handleFitToScreen()
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [handleFitToScreen])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background stars effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Control panel */}
      <div className="absolute top-4 right-4 z-50 flex flex-col md:flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-black/20 border-white/20 text-white hover:bg-white/10 md:w-10 md:h-10 w-8 h-8"
        >
          <ZoomIn className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-black/20 border-white/20 text-white hover:bg-white/10 md:w-10 md:h-10 w-8 h-8"
        >
          <ZoomOut className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleFitToScreen}
          className="bg-black/20 border-white/20 text-white hover:bg-white/10 md:w-10 md:h-10 w-8 h-8"
        >
          <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="bg-black/20 border-white/20 text-white hover:bg-white/10 md:w-10 md:h-10 w-8 h-8"
        >
          <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-4 right-4 z-50 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white text-sm">
        {Math.round(scale * 100)}%
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-50 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 md:px-4 text-white text-xs md:text-sm">
        <div className="flex flex-col gap-1">
          <div>Click nodes to explore</div>
          <div className="text-xs opacity-70 hidden md:block">
            Drag to pan • Ctrl+Scroll to zoom
          </div>
          <div className="text-xs opacity-70 md:hidden">Drag to pan • Pinch to zoom</div>
        </div>
      </div>

      {/* Main canvas */}
      <motion.div
        ref={canvasRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing touch-pan-x touch-pan-y"
        drag
        dragConstraints={false}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onPan={handlePan}
        animate={controls}
        style={{
          scale,
          x: position.x,
          y: position.y,
        }}
      >
        {/* SVG for connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="-850 -650 1700 1300"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {connections.map((connection, index) => (
            <MindMapConnection
              key={`${connection.from.id}-${connection.to.id}`}
              fromNode={connection.from}
              toNode={connection.to}
              scale={1}
              index={index}
            />
          ))}
        </svg>

        {/* Nodes */}
        <div className="relative w-full h-full">
          {visibleNodes.map((node, index) => (
            <MindMapNode key={node.id} node={node} index={index} scale={1} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
