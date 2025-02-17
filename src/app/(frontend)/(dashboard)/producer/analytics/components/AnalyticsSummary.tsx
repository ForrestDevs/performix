interface AnalyticsSummaryProps {
  metrics: {
    totalEnrollments: number
    activeEnrollments: number
    completedEnrollments: number
    totalReviews: number
    totalRevenue: number
  }
}

export function AnalyticsSummary({ metrics }: AnalyticsSummaryProps) {
  const stats = [
    {
      name: 'Total Enrollments',
      value: metrics.totalEnrollments,
      unit: 'students',
    },
    {
      name: 'Active Students',
      value: metrics.activeEnrollments,
      unit: 'students',
    },
    {
      name: 'Course Completions',
      value: metrics.completedEnrollments,
      unit: 'students',
    },
    {
      name: 'Total Reviews',
      value: metrics.totalReviews,
      unit: 'reviews',
    },
    {
      name: 'Total Revenue',
      value: metrics.totalRevenue,
      unit: 'USD',
      format: true,
    },
  ]

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">Overview</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.format
                  ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.value)
                  : item.value.toLocaleString()}
              </p>
              <p className="ml-2 text-sm text-gray-500">{item.unit}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
