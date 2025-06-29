import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

export default function CheckoutLoading() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* User Info Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between border-t pt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form Card */}
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Element Placeholder */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Address Element Placeholder */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Submit Button Placeholder */}
          <div className="pt-4">
            <div className="flex items-center justify-center h-12 bg-blue-600 rounded-lg">
              <Loader2 className="w-5 h-5 text-white animate-spin mr-2" />
              <span className="text-white font-medium">Loading checkout...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
