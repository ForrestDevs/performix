import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getNodeById, getNodeChildren, getNodePath } from '@/lib/data/mind-map'
import { Button } from '@/components/ui/button'
import { NodeDetailClient } from '@/components/layout/mind-map/node-detail-client'

interface NodePageProps {
  params: Promise<{ node: string[] }>
}

export async function generateMetadata({ params }: NodePageProps): Promise<Metadata> {
  const { node: nodeSegments } = await params
  const nodeId = nodeSegments?.[0]

  if (!nodeId) {
    return {
      title: 'Node Not Found',
    }
  }

  const node = getNodeById(nodeId)

  if (!node) {
    return {
      title: 'Node Not Found',
    }
  }

  return {
    title: `${node.title} - Mind Map`,
    description: node.description,
    openGraph: {
      title: `${node.title} - Mind Map`,
      description: node.description,
      type: 'website',
    },
  }
}

export default async function NodePage({ params }: NodePageProps) {
  const { node: nodeSegments } = await params
  const nodeId = nodeSegments?.[0]

  if (!nodeId) {
    notFound()
  }

  const node = getNodeById(nodeId)

  if (!node) {
    notFound()
  }

  const children = getNodeChildren(node.id)
  const breadcrumbs = getNodePath(node.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <div className="relative z-20 p-8">
        <Link href="/mind">
          <Button
            variant="outline"
            className="mb-4 bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mind Map
          </Button>
        </Link>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-white/70 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index < breadcrumbs.length - 1 ? (
                <Link href={`/mind/${crumb.id}`} className="hover:text-white transition-colors">
                  {crumb.title}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.title}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Client-side animated content */}
      <NodeDetailClient node={node} childNodes={children} />
    </div>
  )
}
