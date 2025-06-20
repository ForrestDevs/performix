import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blueprint Header Section Skeleton */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center space-x-2 mb-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Title and meta skeleton */}
            <div className="mb-6">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-5 w-full max-w-2xl mb-4" />

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-16" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Image skeleton */}
                <Card>
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-64 rounded-t-lg" />
                  </CardContent>
                </Card>

                {/* Overview Section */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-7 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Sections */}
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>

                        {/* Code block or image placeholder */}
                        <Skeleton className="h-32 w-full rounded-md" />

                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions Card */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-24" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>

                {/* Specifications Card */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Requirements Card */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-28" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Skeleton className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <Skeleton className="h-4 flex-grow" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Resources */}
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-36" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-3">
                          <Skeleton className="h-12 w-12 rounded-md flex-shrink-0" />
                          <div className="flex-grow space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blueprints Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-96" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="group cursor-pointer">
                  <CardContent className="p-0">
                    <Skeleton className="w-full h-48 rounded-t-lg" />
                  </CardContent>
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
