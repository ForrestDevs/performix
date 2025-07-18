export function FeaturedMentorsLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="border-0 shadow-lg rounded-lg p-6 animate-pulse">
          <div className="aspect-square rounded-xl bg-gray-200 mb-4" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  )
}
