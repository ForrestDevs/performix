'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Download, FileText, Image, Film, Archive, File } from 'lucide-react'
import { Media } from '@/payload-types'

interface DownloadableFilesProps {
  files: Media[]
  isAuthenticated: boolean
  onAuthRequired: () => void
}

export default function DownloadableFiles({
  files,
  isAuthenticated,
  onAuthRequired,
}: DownloadableFilesProps) {
  if (!files || files.length === 0) return null

  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return File

    if (mimeType.startsWith('image/')) return Image
    if (mimeType.startsWith('video/')) return Film
    if (mimeType.includes('pdf')) return FileText
    if (mimeType.includes('zip') || mimeType.includes('rar')) return Archive
    return File
  }

  const getFileTypeColor = (mimeType?: string) => {
    if (!mimeType) return 'bg-gray-100 text-gray-600'

    if (mimeType.startsWith('image/')) return 'bg-green-100 text-green-600'
    if (mimeType.startsWith('video/')) return 'bg-purple-100 text-purple-600'
    if (mimeType.includes('pdf')) return 'bg-red-100 text-red-600'
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'bg-yellow-100 text-yellow-600'
    return 'bg-blue-100 text-blue-600'
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

  const handleDownload = (file: Media) => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }

    if (file.url) {
      window.open(file.url, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-[#0891B2] to-[#0E7490] rounded-lg flex items-center justify-center">
          <Download className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Download Files</h3>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {files.map((file, index) => {
          const FileIcon = getFileIcon(file.mimeType || '')
          const colorClass = getFileTypeColor(file.mimeType || '')

          return (
            <motion.div
              key={file.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              className="group flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}
                >
                  <FileIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.filename || `File ${index + 1}`}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {file.mimeType && (
                      <span className="uppercase">{file.mimeType.split('/')[1]}</span>
                    )}
                    {file.filesize && (
                      <>
                        <span>•</span>
                        <span>{formatFileSize(file.filesize)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleDownload(file)}
                variant={isAuthenticated ? 'default' : 'outline'}
                size="sm"
                className={
                  isAuthenticated
                    ? 'bg-[#0891B2] hover:bg-[#0E7490] text-white group-hover:scale-105 transition-transform'
                    : 'border-gray-300 text-gray-500 cursor-not-allowed'
                }
              >
                {isAuthenticated ? (
                  <>
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </>
                ) : (
                  'Sign in required'
                )}
              </Button>
            </motion.div>
          )
        })}
      </div>

      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-800">
            <span className="font-medium">Sign in required:</span> Create a free account to download
            these files and access the full blueprint.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
