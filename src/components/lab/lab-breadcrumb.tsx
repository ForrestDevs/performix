import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface LabBreadcrumbProps {
  title: string
  currentPage: {
    type: 'module' | 'volume' | 'lesson'
    slug: string
  }
  module?: {
    title: string
    slug: string
  }
  volume?: {
    title: string
    slug: string
  }
}

export function LabBreadcrumb({ title, currentPage, module, volume }: LabBreadcrumbProps) {
  // Mobile breadcrumb logic - simplified structure
  const getMobileBreadcrumb = () => {
    switch (currentPage.type) {
      case 'module':
        return (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/lab" className="hover:text-gray-700">
              Lab
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{title}</span>
          </div>
        )

      case 'volume':
        if (module) {
          return (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href={`/lab/module/${module.slug}`} className="hover:text-gray-700 truncate">
                {module.title}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium truncate">{title}</span>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/lab" className="hover:text-gray-700">
              Lab
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{title}</span>
          </div>
        )

      case 'lesson':
        if (volume) {
          const volumeHref = `/lab/volume/${volume.slug}`
          return (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href={volumeHref} className="hover:text-gray-700 truncate">
                {volume.title}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium truncate">{title}</span>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/lab" className="hover:text-gray-700">
              Lab
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{title}</span>
          </div>
        )

      default:
        return null
    }
  }

  // Desktop breadcrumb - full structure with back button
  const getDesktopBreadcrumb = () => (
    <div className="flex items-center gap-4">
      <Link
        href="/lab"
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'flex items-center gap-2')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lab
      </Link>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/lab" className="hover:text-gray-700">
          Lab
        </Link>
        {module && (
          <>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/lab/module/${module.slug}`} className="hover:text-gray-700">
              {module.title}
            </Link>
          </>
        )}
        {volume && (
          <>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/lab/volume/${volume.slug}`} className="hover:text-gray-700">
              {volume.title}
            </Link>
          </>
        )}
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{title}</span>
      </div>
    </div>
  )

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="block lg:hidden">{getMobileBreadcrumb()}</div>
        <div className="hidden lg:block">{getDesktopBreadcrumb()}</div>
      </div>
    </div>
  )
}
