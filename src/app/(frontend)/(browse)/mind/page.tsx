import type { Metadata } from 'next'
import { MindMapCanvas } from '@/components/layout/mind-map/mind-map-canvas'

export const metadata: Metadata = {
  title: 'Mind Map - Ultimate Performance Mastery',
  description:
    'Explore the interactive mind map of our comprehensive performance course. Navigate through modules, volumes, and lessons in an immersive visual experience.',
  openGraph: {
    title: 'Mind Map - Ultimate Performance Mastery',
    description: 'Explore the interactive mind map of our comprehensive performance course.',
    type: 'website',
  },
}

export default function MindMapPage() {
  return (
    <div className="w-full h-screen relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Ultimate Performance Mastery
          </h1>
          <p className="text-white/80 text-lg">
            Navigate through our comprehensive course structure. Click on any node to explore its
            contents and sub-modules.
          </p>
        </div>
      </div>

      {/* Mind Map Canvas */}
      <MindMapCanvas />
    </div>
  )
}
