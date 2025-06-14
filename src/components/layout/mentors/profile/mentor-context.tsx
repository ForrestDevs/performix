'use client'

import { Mentor } from '@/payload-types'
import { createContext, useContext, ReactNode } from 'react'

// Mentor data types
export interface MentorLocation {
  city: string
  state: string
  coordinates: {
    lat: number
    lng: number
  }
  inPersonAvailable: boolean
  travelRadius: number
}

export interface MentorSkill {
  name: string
  level: number
  description: string
}

export interface MentorExperience {
  title: string
  organization: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
}

export interface MentorGalleryItem {
  type: 'image' | 'video'
  category: string
  url: string
  caption: string
  videoId?: string
}

export interface MentorSessionType {
  name: string
  duration: number
  price: number
  description: string
}

export interface MentorReview {
  id: number
  studentName: string
  studentAvatar: string
  rating: number
  date: string
  text: string
  sessionType: string
  progress: {
    before: string
    after: string
  }
}

export interface MentorFAQ {
  question: string
  answer: string
}

export interface MentorData {
  id: string
  name: string
  position: string
  currentTeam: string
  school: string
  age: number
  location: MentorLocation
  bio: string
  shortBio: string
  avatar: string
  heroImage: string
  socialMedia: {
    instagram: string
    tiktok: string
    youtube: string
    eliteProspects: string
  }
  skills: MentorSkill[]
  agesServed: {
    min: number
    max: number
    preferred: number[]
  }
  sportsPlayed: string[]
  experience: MentorExperience[]
  gallery: MentorGalleryItem[]
  sessionTypes: MentorSessionType[]
  availability: Record<string, string[]>
  reviews: MentorReview[]
  successMetrics: {
    studentsHelped: number
    d1Commitments: number
    averageImprovement: string
    successRate: number
  }
  faqs: MentorFAQ[]
}

interface MentorContextType {
  mentor: Mentor
}

const MentorContext = createContext<MentorContextType | undefined>(undefined)

export function MentorProvider({ mentor, children }: { mentor: Mentor; children: ReactNode }) {
  return <MentorContext.Provider value={{ mentor }}>{children}</MentorContext.Provider>
}

export function useMentor() {
  const context = useContext(MentorContext)
  if (context === undefined) {
    throw new Error('useMentor must be used within a MentorProvider')
  }
  return context
}
