import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perfomix - Elevate Your Performance',
  description:
    'Transform your life with expert-led courses in nutrition, exercise, and skill enhancement. Join Perfomix to unlock your full potential.',
}

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Unlock Your Full Potential with Expert-Led Courses
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your life through comprehensive courses in nutrition, exercise, and skill
              enhancement. Learn from industry experts and achieve measurable results.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/courses"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Explore Courses
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Perfomix</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to excel
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="font-semibold leading-7 text-gray-900 text-lg">Expert-Led Content</dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                Learn from industry professionals with proven track records in their fields.
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-semibold leading-7 text-gray-900 text-lg">
                Comprehensive Learning
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                From nutrition to exercise to skill enhancement, get everything you need to succeed.
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-semibold leading-7 text-gray-900 text-lg">Track Your Progress</dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                Monitor your improvement with detailed progress tracking and assessments.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to transform your life?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of successful learners who have already elevated their performance with
              Perfomix.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/courses"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
