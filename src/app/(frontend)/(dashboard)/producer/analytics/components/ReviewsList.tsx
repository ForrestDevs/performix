import { Course } from '@/payload-types'
import Link from 'next/link'

interface ReviewsListProps {
  courses: Array<
    Course & {
      analytics: {
        totalEnrollments: number
        activeEnrollments: number
        completedEnrollments: number
        totalReviews: number
        averageRating: number
        reviews?: Array<{
          id: number
          rating: number
          content: string
          user: {
            name: string
          }
          createdAt: string
        }>
      }
    }
  >
}

export function ReviewsList({ courses }: ReviewsListProps) {
  // Combine all reviews from all courses
  const allReviews = courses.flatMap((course) =>
    (course.analytics.reviews || []).map((review) => ({
      ...review,
      course: {
        id: course.id,
        title: course.title,
      },
    })),
  )

  // Sort reviews by date, most recent first
  const sortedReviews = allReviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Reviews</h3>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {sortedReviews.map((review) => (
              <li key={review.id} className="py-5">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      <Link
                        href={`/producer/courses/${review.course.id}/edit`}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        {review.course.title}
                      </Link>
                    </p>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-500">by {review.user.name}</p>
                      <span className="mx-2 text-gray-300">·</span>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{review.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
