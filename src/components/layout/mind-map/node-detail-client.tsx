'use client'

import { motion } from 'motion/react'
import { CheckCircle2, Play } from 'lucide-react'
import { MindNode } from '@/lib/data/mind-map'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NodeDetailClientProps {
  node: MindNode
  childNodes: MindNode[]
}

export function NodeDetailClient({ node, childNodes }: NodeDetailClientProps) {
  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-purple-500'
      case 'module':
        return 'bg-green-500'
      case 'volume':
        return 'bg-amber-500'
      case 'lesson':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <Play className="w-4 h-4" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Node Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`${getNodeTypeColor(node.type)} w-16 h-16 rounded-full flex items-center justify-center text-2xl`}
              style={{ backgroundColor: node.color }}
            >
              {node.icon}
            </div>
            <div>
              <Badge variant="outline" className="mb-2 border-white/20 text-white">
                {node.type.toUpperCase()}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{node.title}</h1>
              <p className="text-xl text-white/80">{node.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            {node.content?.overview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-black/20 border-white/20 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-white">Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 leading-relaxed">{node.content.overview}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Key Points */}
            {node.content?.keyPoints && node.content.keyPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-black/20 border-white/20 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-white">Key Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {node.content.keyPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3 text-white/80"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Videos */}
            {node.content?.videos && node.content.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-black/20 border-white/20 backdrop-blur-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-white">Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {node.content.videos.map((video, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-5 h-5 text-blue-400" />
                            <div>
                              <h4 className="text-white font-medium">{video.title}</h4>
                              <p className="text-white/60 text-sm">{video.duration}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            Play
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sub-nodes */}
            {childNodes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-black/20 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {node.type === 'course'
                        ? 'Modules'
                        : node.type === 'module'
                          ? 'Volumes'
                          : 'Lessons'}
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      {childNodes.length} {childNodes.length === 1 ? 'item' : 'items'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {childNodes.map((child, index) => (
                        <motion.div
                          key={child.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <a href={`/mind/${child.id}`}>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${getNodeTypeColor(child.type)}`}
                                style={{ backgroundColor: child.color }}
                              >
                                {child.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium group-hover:text-white/90 transition-colors">
                                  {child.title}
                                </h4>
                                <p className="text-white/60 text-sm truncate">
                                  {child.description}
                                </p>
                              </div>
                              {getNodeIcon(child.type)}
                            </div>
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
