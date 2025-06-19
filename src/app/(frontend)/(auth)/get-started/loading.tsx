export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-lg border-0">
            <div className="p-8">
              {/* Header skeleton */}
              <div className="text-center mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
              </div>

              {/* Google button skeleton */}
              <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mb-6" />

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Form skeleton */}
              <div className="space-y-6">
                {/* Name field */}
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Email field */}
                <div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Password field */}
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Confirm Password field */}
                <div>
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Submit button */}
                <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />

                {/* Sign in link */}
                <div className="text-center">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
