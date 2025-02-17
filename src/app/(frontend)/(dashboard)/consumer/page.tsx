import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React, { Suspense } from 'react'
import Link from 'next/link'

export default async function ConsumerDashboard() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Learning Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progress Overview Card */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">2 courses in progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <Link href="/my-courses" className="text-blue-600 hover:underline">
              Continue Learning
            </Link>
          </div>
        </div>

        {/* Active Courses Card */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Courses</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">Currently enrolled in:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Performance Optimization</li>
              <li>Advanced Training Methods</li>
            </ul>
            <Link href="/courses" className="text-blue-600 hover:underline">
              Browse More Courses
            </Link>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">3 certificates earned</p>
            <Link href="/achievements" className="text-blue-600 hover:underline">
              View Certificates
            </Link>
          </div>
        </div>
      </div>

      {/* Learning Resources Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/resources"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="font-medium">Learning Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Access supplementary materials and guides</p>
          </Link>
          
          <Link 
            href="/community"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h3 className="font-medium">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Connect with other learners and instructors</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Learning Dashboard | Performix',
    description: 'Track your course progress and access learning resources.',
    openGraph: mergeOpenGraph({
      title: 'Learning Dashboard',
      url: '/consumer',
    }),
  }
}

