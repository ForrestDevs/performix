import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function VolumeLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <Skeleton className="h-6 w-64 mb-8" />
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-10 w-96 mb-4" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mb-8" />

          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-64 mb-1" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-10 w-24" />
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
