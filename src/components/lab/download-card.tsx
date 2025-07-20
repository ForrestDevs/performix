import { Media } from '@/payload-types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Image, Film, Archive, File, Lock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '../ui/button'

export function DownloadCard({ file }: { file: Media }) {
  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return File

    if (mimeType.startsWith('image/')) return Image
    if (mimeType.startsWith('video/')) return Film
    if (mimeType.includes('pdf')) return FileText
    if (mimeType.includes('zip') || mimeType.includes('rar')) return Archive
    return File
  }

  const formatFileSize = (size?: number) => {
    if (!size) return 'Unknown size'

    const units = ['B', 'KB', 'MB', 'GB']
    let fileSize = size
    let unitIndex = 0

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024
      unitIndex++
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`
  }

  const getFileTypeLabel = (mimeType?: string) => {
    if (!mimeType) return 'unknown'

    const type = mimeType.split('/')[1]

    // Handle specific complex mime types
    if (type === 'vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx'
    if (type === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'xlsx'
    if (type === 'vnd.openxmlformats-officedocument.presentationml.presentation') return 'pptx'
    if (type === 'vnd.ms-excel') return 'xls'
    if (type === 'msword') return 'doc'

    return type
  }

  const FileIcon = getFileIcon(file.mimeType || '')
  const colorClass = 'bg-blue-100 text-blue-600'

  return (
    <Card className="group border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}
          >
            <FileIcon className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate mb-1">{file.filename}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              {file.mimeType && (
                <span className="inline-block uppercase font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                  {getFileTypeLabel(file.mimeType)}
                </span>
              )}
              {file.filesize && (
                <span className="text-sm text-gray-500 font-medium">
                  {formatFileSize(file.filesize)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Link
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'bg-[#0891B2] hover:bg-[#0E7490] text-white hover:text-gray-200',
            )}
            href={file.url || ''}
            target="_blank"
          >
            <Download className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
