export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="border-0 shadow-2xl rounded-lg bg-white">
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
                  {/* Email field */}
                  <div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                  </div>

                  {/* Password field */}
                  <div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                  </div>

                  {/* Forgot password link */}
                  <div className="text-right">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse ml-auto" />
                  </div>

                  {/* Submit button */}
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Sign up link */}
                <div className="mt-6 text-center">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
