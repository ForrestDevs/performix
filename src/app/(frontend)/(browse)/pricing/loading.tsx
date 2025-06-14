import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-[#0891B2] to-[#0E7490] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="h-12 w-3/4 max-w-2xl mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 max-w-xl mx-auto mb-8" />

            {/* Billing Toggle Skeleton */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 max-w-2xl mx-auto gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section Skeleton */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-2 h-full">
                <CardHeader className="text-center pt-8 pb-4">
                  <Skeleton className="h-6 w-24 mx-auto mb-4" />
                  <Skeleton className="h-10 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex items-start">
                        <Skeleton className="h-5 w-5 mr-2 flex-shrink-0" />
                        <Skeleton className="h-5 flex-grow" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 pb-8">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-4 px-6">
                    <Skeleton className="h-6 w-32" />
                  </th>
                  {[...Array(3)].map((_, i) => (
                    <th key={i} className="py-4 px-6">
                      <Skeleton className="h-6 w-24 mx-auto mb-2" />
                      <Skeleton className="h-8 w-16 mx-auto mb-1" />
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-4 px-6">
                      <Skeleton className="h-5 w-40" />
                    </td>
                    {[...Array(3)].map((_, j) => (
                      <td key={j} className="py-4 px-6">
                        <Skeleton className="h-5 w-5 mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
