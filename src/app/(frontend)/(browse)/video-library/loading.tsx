import React from 'react'

export default function VideoLibraryLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="mb-12 text-center">
          <div className="h-10 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg max-w-3xl mx-auto animate-pulse" />
        </div>

        {/* Category sections skeleton */}
        <div className="space-y-16">
          {[...Array(3)].map((_, categoryIndex) => (
            <section key={categoryIndex} className="bg-white rounded-lg shadow-lg p-8">
              {/* Category header skeleton */}
              <div className="mb-8">
                <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                </div>
              </div>

              {/* Video grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, videoIndex) => (
                  <div key={videoIndex} className="group">
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
                      <div className="absolute top-2 left-2 bg-gray-300 rounded-md w-32 h-6 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
