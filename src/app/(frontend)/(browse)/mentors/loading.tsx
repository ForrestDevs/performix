import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-2xl mx-auto mb-8" />

            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto mb-8">
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>

            {/* Filter Pills Skeleton */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>

            {/* Stats Skeleton */}
            <div className="flex justify-center items-center space-x-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-32" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-40" />
            </div>
          </div>

          {/* Mentor Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-40 mb-3" />
                    <Skeleton className="h-4 w-full mb-3.5" />
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-5 w-20" />
                      ))}
                    </div>
                    <Skeleton className="h-9 w-32" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
