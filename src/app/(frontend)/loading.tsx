import React from 'react'
import { PerformixLogoClear } from '@/components/logo'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-pulse">
          <PerformixLogoClear />
        </div>

        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[#0891B2] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#0891B2] rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-[#0891B2] rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#0891B2]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}
