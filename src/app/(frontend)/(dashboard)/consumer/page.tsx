import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React, { Suspense } from 'react'
import Link from 'next/link'
import { getSessionAction } from '@/lib/actions/auth'
import { getStudentProfileAction, checkStudentProfileCompletionAction } from '@/lib/actions/student'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, BookOpen, Users, Award, Settings, CheckCircle, AlertCircle } from 'lucide-react'

export default async function StudentDashboard() {
  const user = await getSessionAction()

  if (!user) {
    redirect('/sign-in')
  }

  const profileStatus = await checkStudentProfileCompletionAction(user.id)
  const studentProfile = await getStudentProfileAction(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || 'Student'}!
          </h1>
          <p className="text-gray-600">Track your progress and access your mentorship resources</p>
        </div>

        {/* Profile Status Banner */}
        {!profileStatus.isComplete && (
          <Card className="mb-8 border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-8 w-8 text-orange-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-900">Complete Your Profile</h3>
                  <p className="text-orange-700 mb-4">
                    Finish setting up your hockey profile to get matched with the perfect mentor
                  </p>
                  <Link href="/get-started?step=3">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Resources</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mentors</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Progress</p>
                      <p className="text-2xl font-bold text-gray-900">85%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Profile Created</p>
                      <p className="text-sm text-gray-600">You completed your hockey profile</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Account Verified</p>
                      <p className="text-sm text-gray-600">Your email has been verified</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Available Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/mentors" className="group">
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow group-hover:border-blue-300">
                      <Users className="h-8 w-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold mb-2">Browse Mentors</h3>
                      <p className="text-sm text-gray-600">Connect with D1+ players and coaches</p>
                    </div>
                  </Link>

                  <Link href="/resources" className="group">
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow group-hover:border-blue-300">
                      <BookOpen className="h-8 w-8 text-green-600 mb-3" />
                      <h3 className="font-semibold mb-2">Training Resources</h3>
                      <p className="text-sm text-gray-600">Access training videos and guides</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Your Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-sm text-gray-900">{user.name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{user.email}</p>
                  </div>
                  {studentProfile && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Position</p>
                        <p className="text-sm text-gray-900 capitalize">
                          {studentProfile.position?.replace('-', ' ') || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Current Level</p>
                        <p className="text-sm text-gray-900 capitalize">
                          {studentProfile.currentLevel?.replace('-', ' ') || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Goal</p>
                        <p className="text-sm text-gray-900 uppercase">
                          {studentProfile.goalLevel || 'Not set'}
                        </p>
                      </div>
                    </>
                  )}
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/mentors">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Find a Mentor
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse Resources
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
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
