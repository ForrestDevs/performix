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

