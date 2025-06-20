import type { Metadata } from 'next'
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React from 'react'
import Link from 'next/link'
import StudentProfileSetup from '@/components/StudentProfileSetup'
import { getStudentProfileAction } from '@/lib/actions/student'
import { getAgeFromBirthDate } from '@/lib/utilities/birthDateAge'
import { getUserSession } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'

// Client Components
import WelcomeSection from '@/components/layout/students/WelcomeSection'
import QuickStats from '@/components/layout/students/QuickStats'
import CurrentMentor from '@/components/layout/students/CurrentMentor'
import StudentPrograms from '@/components/layout/students/StudentPrograms'
import AvailableResources from '@/components/layout/students/AvailableResources'
import StudentProfile from '@/components/layout/students/StudentProfile'
import StudentGoals from '@/components/layout/students/StudentGoals'
import RecentActivity from '@/components/layout/students/RecentActivity'

export default async function ConsumerDashboard() {
  const user = await getUserSession()

  if (!user) {
    redirect('/sign-in')
  }

  const userProfile = await getStudentProfileAction(user.id)

  // // If user hasn't completed their profile, show the setup form
  if (!userProfile) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-[#0891B2] to-[#0E7490] bg-clip-text text-transparent font-['Space_Grotesk']">
              Welcome to Performix!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Let&apos;s get you set up with your hockey profile so we can match you with the
              perfect mentor.
            </p>
          </div>

          <StudentProfileSetup />

          {/* What happens next section */}
          <div className="max-w-2xl mx-auto mt-8 sm:mt-12">
            <div className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-lg p-6 sm:p-8">
              <h3 className="font-semibold text-gray-900 mb-6 text-center text-lg">
                What happens after you complete your profile?
              </h3>
              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <span className="text-gray-700">
                    Access your personalized dashboard with mentor recommendations
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <span className="text-gray-700">
                    Browse and connect with mentors that match your goals
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <span className="text-gray-700">
                    Start your journey to D1 hockey with personalized guidance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Prepare data for client components
  const studentData = {
    id: userProfile.id,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    currentTeam: userProfile.currentTeam,
    position: userProfile.position,
    currentLevel: userProfile.currentLevel,
    age: getAgeFromBirthDate(userProfile.birthDate),
    goals: userProfile.goals ? userProfile.goals.split('\n').filter(Boolean) : [],
    bio: userProfile.bio,
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  }

  // Mock data for now - these would come from database later
  const dashboardData = {
    stats: {
      sessionsCompleted: 0,
      coursesInProgress: 0,
      goalsAchieved: 0,
      weeklyProgress: 0,
    },
    mentor: null, // No mentor assigned initially
    enrolledPrograms: [],
    availableResources: [
      {
        id: 1,
        title: 'Getting Started with Performix',
        type: 'PDF Guide',
        isNew: true,
        duration: '10 min read',
      },
      {
        id: 2,
        title: 'Setting Your Hockey Goals',
        type: 'Video Course',
        isNew: true,
        duration: '15 min',
      },
    ],
    recentActivity: [
      {
        id: 1,
        action: 'Profile completed successfully',
        time: 'Just now',
        mentor: null,
      },
    ],
  }

  // If user has completed their profile, show the modern dashboard
  return (
    // <>DASHBOARD</>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection student={studentData} />
        <QuickStats stats={dashboardData.stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CurrentMentor mentor={dashboardData.mentor} />
            <StudentPrograms programs={dashboardData.enrolledPrograms} />
            <AvailableResources resources={dashboardData.availableResources} />
          </div>

          <div className="space-y-8">
            <StudentProfile student={studentData} />
            <StudentGoals student={studentData} />
            <RecentActivity activities={dashboardData.recentActivity} />
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
