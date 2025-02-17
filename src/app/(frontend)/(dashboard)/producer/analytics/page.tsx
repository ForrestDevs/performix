import { getCurrentUser } from '@/lib/data/auth'
import getPayload from '@/lib/utilities/getPayload'
import { Course } from '@/payload-types'
import { getCourseAnalytics } from '@/lib/data/course'
import { AnalyticsSummary } from './components/AnalyticsSummary'
import { CoursePerformance } from './components/CoursePerformance'
import { RevenueChart } from './components/RevenueChart'
import { ReviewsList } from './components/ReviewsList'

async function getProducerCourses(producerId: number) {
  const payload = await getPayload()
  try {
    const res = await payload.find({
      collection: 'courses',
      where: {
        producer: {
          equals: producerId,
        },
      },
      depth: 0,
    })

    if (!res.docs) {
      throw new Error('Failed to fetch courses')
    }

    return res.docs as Course[]
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export default async function AnalyticsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const courses = await getProducerCourses(user.id)
  const analyticsPromises = courses.map((course) => getCourseAnalytics(course.id))
  const analyticsResults = await Promise.all(analyticsPromises)

  // Calculate total metrics
  const totalMetrics = analyticsResults.reduce(
    (acc, curr, index) => {
      acc.totalEnrollments += curr.totalEnrollments
      acc.activeEnrollments += curr.activeEnrollments
      acc.completedEnrollments += curr.completedEnrollments
      acc.totalReviews += curr.totalReviews
      acc.totalRevenue += curr.totalEnrollments * (courses[index]?.price || 0)
      return acc
    },
    {
      totalEnrollments: 0,
      activeEnrollments: 0,
      completedEnrollments: 0,
      totalReviews: 0,
      totalRevenue: 0,
    },
  )

  // Combine course data with analytics
  const coursePerformance = courses.map((course, index) => {
    const analytics = analyticsResults[index]
    return {
      ...course,
      analytics: {
        totalEnrollments: analytics?.totalEnrollments || 0,
        activeEnrollments: analytics?.activeEnrollments || 0,
        completedEnrollments: analytics?.completedEnrollments || 0,
        totalReviews: analytics?.totalReviews || 0,
        averageRating: analytics?.averageRating || 0,
        reviews: analytics?.reviews?.map((review) => ({
          id: review.id,
          rating: review.rating,
          content: review.content,
          user: { name: typeof review.user === 'number' ? '' : review.user.name },
          createdAt: review.createdAt,
        })),
      },
    }
  })

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Analytics
          </h2>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <AnalyticsSummary metrics={totalMetrics} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CoursePerformance courses={coursePerformance} />
          <RevenueChart courses={coursePerformance} />
        </div>

        <ReviewsList courses={coursePerformance} />
      </div>
    </div>
  )
}
