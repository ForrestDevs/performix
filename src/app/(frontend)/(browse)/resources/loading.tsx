import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8" />

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

      {/* Main Content Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Articles */}
            <div className="lg:col-span-4">
              {/* Controls Skeleton */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <Skeleton className="h-8 w-48" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>

              {/* Articles Grid Skeleton */}
              <div className="grid md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-6">
                        <Skeleton className="h-4 w-24 mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Skeleton */}
              <div className="text-center mt-12">
                <Skeleton className="h-12 w-48 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
