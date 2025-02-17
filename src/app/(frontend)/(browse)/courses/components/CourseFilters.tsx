'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

const categories = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Music',
  'Photography',
  'Health & Fitness',
  'Personal Development',
]

const priceRanges = [
  { label: 'Free', min: 0, max: 0 },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 to $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: null },
]

export function CourseFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900">Categories</h3>
        <div className="mt-4 space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                id={`category-${category}`}
                name="category"
                value={category}
                type="checkbox"
                checked={searchParams.get('category') === category}
                onChange={(e) => {
                  router.push(pathname + '?' + createQueryString('category', e.target.value))
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Price</h3>
        <div className="mt-4 space-y-4">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center">
              <input
                id={`price-${range.label}`}
                name="price"
                value={JSON.stringify(range)}
                type="radio"
                checked={searchParams.get('price') === JSON.stringify(range)}
                onChange={(e) => {
                  router.push(pathname + '?' + createQueryString('price', e.target.value))
                }}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor={`price-${range.label}`} className="ml-3 text-sm text-gray-600">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Rating</h3>
        <div className="mt-4 space-y-4">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                id={`rating-${rating}`}
                name="rating"
                value={rating}
                type="radio"
                checked={searchParams.get('rating') === rating.toString()}
                onChange={(e) => {
                  router.push(pathname + '?' + createQueryString('rating', e.target.value))
                }}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-3 text-sm text-gray-600 flex items-center"
              >
                {rating}+ <span className="text-yellow-400 ml-1">★</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
