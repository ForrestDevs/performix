import { Skeleton } from '@/components/ui/skeleton'

export default function MentorProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-12">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-12 w-3/4 max-w-2xl mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-xl mb-6" />

          <div className="flex flex-wrap gap-6 mb-8">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>

          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-32 rounded-md" />
            <Skeleton className="h-12 w-32 rounded-md" />
          </div>
        </div>
      </section>

      {/* Navigation Skeleton */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 py-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">
            {/* About Section */}
            <section>
              <Skeleton className="h-8 w-48 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />

              {/* Skills Grid */}
              <div className="mt-12">
                <Skeleton className="h-6 w-40 mb-6" />
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              </div>

              {/* Ages & Sports */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-40 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-6 w-40 mb-4" />
                  <Skeleton className="h-40 w-full rounded-lg" />
                </div>
              </div>
            </section>

            {/* Experience Timeline */}
            <section>
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative pl-12">
                    <Skeleton className="absolute left-0 top-0 w-8 h-8 rounded-full" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <Skeleton className="h-8 w-40 mb-6" />
              <div className="flex flex-wrap gap-2 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <Skeleton className="h-8 w-56 mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            </section>

            {/* Availability */}
            <section>
              <Skeleton className="h-8 w-56 mb-6" />
              <Skeleton className="h-96 w-full rounded-lg" />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <Skeleton className="h-[600px] w-full rounded-lg" />

            {/* Location Card */}
            <Skeleton className="h-80 w-full rounded-lg" />

            {/* FAQs */}
            <Skeleton className="h-64 w-full rounded-lg" />

            {/* Contact Card */}
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-8 w-2/3 mx-auto mb-6" />
            <Skeleton className="h-4 w-full mb-2 mx-auto" />
            <Skeleton className="h-4 w-5/6 mb-8 mx-auto" />
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="h-12 w-40 rounded-md" />
              <Skeleton className="h-12 w-40 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="h-8 w-32 bg-gray-800 mb-4" />
                <Skeleton className="h-4 w-full bg-gray-800 mb-2" />
                <Skeleton className="h-4 w-5/6 bg-gray-800 mb-2" />
                <Skeleton className="h-4 w-4/6 bg-gray-800 mb-2" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
