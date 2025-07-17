import React from 'react'
import type { DefaultServerCellComponentProps } from 'payload'

export const DurationCell: React.FC<DefaultServerCellComponentProps> = ({ rowData }) => {
  const formatDuration = (seconds: any): string => {
    if (seconds < 0) return '0:00'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!rowData.duration && rowData.duration !== 0) {
    return <span className="text-gray-400">—</span>
  }

  return <span className="font-mono text-sm">{formatDuration(rowData.duration)}</span>
}
