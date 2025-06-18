import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React, { Suspense } from 'react'
import Link from 'next/link'
import StudentProfileSetup from '@/components/StudentProfileSetup'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Trophy, Mail, Phone, Calendar } from 'lucide-react'

interface UserProfile {
  phone: string
  age: string
  currentLevel: string
  position: string
  currentTeam: string
  goalLevel: string
}

// Mock function to check if user has completed profile
// In a real app, this would fetch from the database
const getUserProfile = async (): Promise<UserProfile | null> => {
  // For demo purposes, return null to show profile setup
  // Set this to a profile object to show completed dashboard
  return null
  
  // Example of completed profile:
  // return {
  //   phone: '+1 (555) 123-4567',
  //   age: '18',
  //   currentLevel: 'Junior A',
  //   position: 'Center',
  //   currentTeam: 'Example Hockey Club',
  //   goalLevel: 'Division 1 (D1)',
  // }
}

const handleProfileComplete = async (profileData: UserProfile) => {
  // In a real app, this would save to the database
  console.log('Saving profile data:', profileData)
  
  // Mock API call
  try {
    // await saveUserProfile(profileData)
    // toast.success('Profile completed successfully!')
    // Refresh the page or update state to show dashboard
    window.location.reload()
  } catch (error) {
    console.error('Failed to save profile:', error)
    // toast.error('Failed to save profile. Please try again.')
  }
}

export default async function ConsumerDashboard() {
  const userProfile = await getUserProfile()

  // If user hasn't completed their profile, show the setup form
  if (!userProfile) {
    return (
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Performix!</h1>
          <p className="text-gray-600">
            Let&apos;s get you set up with your hockey profile so we can match you with the perfect mentor.
          </p>
        </div>
        
        <StudentProfileSetup onProfileComplete={handleProfileComplete} />
        
        {/* What happens next section */}
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-[#0891B2]/5 to-[#8B5CF6]/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">What happens after you complete your profile?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <span>Access your personalized dashboard with mentor recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                  <span>Browse and connect with mentors that match your goals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <span>Start your journey to D1 hockey with personalized guidance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // If user has completed their profile, show the regular dashboard
  return (
    <div className="container py-8">
      {/* Profile Summary Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Profile Complete
          </Badge>
        </div>
        
        {/* User Profile Summary */}
        <Card className="bg-gradient-to-r from-[#0891B2]/10 to-[#8B5CF6]/10 border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Hockey Profile</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-[#0891B2]" />
                <div>
                  <span className="text-gray-600">Level:</span>
                  <p className="font-medium">{userProfile.currentLevel}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-[#0891B2]" />
                <div>
                  <span className="text-gray-600">Position:</span>
                  <p className="font-medium">{userProfile.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-[#0891B2]" />
                <div>
                  <span className="text-gray-600">Age:</span>
                  <p className="font-medium">{userProfile.age} years old</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-[#0891B2]" />
                <div>
                  <span className="text-gray-600">Goal:</span>
                  <p className="font-medium">{userProfile.goalLevel}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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

        {/* Mentor Matching Card */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Mentor Matching</h2>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              Based on your profile, we&apos;ve found 3 perfect mentor matches
            </p>
            <Link href="/mentors" className="text-blue-600 hover:underline">
              View Mentor Matches
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
