'use server'

import { getPayload } from '@/lib/utilities/getPayload'
import { revalidatePath } from 'next/cache'
import { STUDENT_SLUG } from '@/payload/collections/constants'

const payload = await getPayload()

export interface StudentProfileData {
  name: string
  email: string
  phone?: string
  age: number
  currentLevel:
    | 'aaa-bantam'
    | 'aaa-midget'
    | 'junior-a'
    | 'junior-b'
    | 'ushl'
    | 'nahl'
    | 'bchl'
    | 'high-school-varsity'
    | 'prep-school'
    | 'other'
  position: 'left-wing' | 'right-wing' | 'center' | 'left-defense' | 'right-defense' | 'goalie'
  currentTeam: string
  goalLevel: 'd1' | 'd3' | 'acha' | 'junior' | 'professional' | 'not-sure'
  goals?: string
  bio?: string
}

export async function createStudentProfileAction(
  userId: number | null,
  profileData: StudentProfileData,
) {
  if (!userId) {
    return { error: 'User ID is required' }
  }

  try {
    // Check if user already has a student profile
    const existingProfile = await payload.find({
      collection: STUDENT_SLUG,
      where: {
        user: {
          equals: userId,
        },
      },
    })

    if (existingProfile.docs.length > 0) {
      return { error: 'Student profile already exists for this user.' }
    }

    // Create new student profile
    const student = await payload.create({
      collection: STUDENT_SLUG,
      data: {
        user: userId,
        ...profileData,
        profileCompleted: true,
      },
    })

    revalidatePath('/consumer')
    return { success: true, student }
  } catch (error: any) {
    console.error('Create student profile error:', error)
    return { error: error.message || 'Failed to create student profile. Please try again.' }
  }
}

export async function updateStudentProfileAction(
  studentId: string,
  profileData: Partial<StudentProfileData>,
) {
  try {
    const student = await payload.update({
      collection: STUDENT_SLUG,
      id: studentId,
      data: {
        ...profileData,
        profileCompleted: true,
      },
    })

    revalidatePath('/consumer')
    return { success: true, student }
  } catch (error: any) {
    console.error('Update student profile error:', error)
    return { error: error.message || 'Failed to update student profile. Please try again.' }
  }
}

export async function getStudentProfileAction(userId: string) {
  try {
    const result = await payload.find({
      collection: STUDENT_SLUG,
      where: {
        user: {
          equals: userId,
        },
      },
    })

    if (result.docs.length === 0) {
      return null
    }

    return result.docs[0]
  } catch (error) {
    console.error('Get student profile error:', error)
    return null
  }
}

export async function checkStudentProfileCompletionAction(userId: string) {
  try {
    const profile = await getStudentProfileAction(userId)
    return {
      hasProfile: !!profile,
      isComplete: !!profile && profile.profileCompleted === true,
    }
  } catch (error) {
    console.error('Check student profile completion error:', error)
    return {
      hasProfile: false,
      isComplete: false,
    }
  }
}
