import { Mentor } from '@/payload-types'

export interface MentorSample {
  id: string
  name: string
  position: string
  university: string
  experience: string
  rating: number
  reviews: number
  price: number
  availability: string
  specializations: string[]
  bio: string
  successRate: number
  studentsHelped: number
  achievements: string[]
  videoIntro: boolean
}

export function filterAndSortMentors(
  mentors: Mentor[],
  searchParams: {
    q?: string
    position?: string
    sort?: string
  },
): Mentor[] {
  let filteredMentors = [...mentors]

  // Filter by search query
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase()
    filteredMentors = filteredMentors.filter(
      (mentor) =>
        mentor.name?.toLowerCase().includes(query) ||
        mentor.position?.toLowerCase().includes(query) ||
        mentor.bio?.toLowerCase().includes(query) ||
        mentor.skills?.some((spec) => spec?.skill?.toLowerCase().includes(query)),
    )
  }

  // Filter by position
  if (searchParams.position) {
    filteredMentors = filteredMentors.filter((mentor) => mentor.position === searchParams.position)
  }

  // Sort mentors
  //   if (searchParams.sort) {
  //     switch (searchParams.sort) {
  //       case 'rating':
  //         filteredMentors.sort((a, b) => b.rating - a.rating)
  //         break
  //       case 'price-low':
  //         filteredMentors.sort((a, b) => a.price - b.price)
  //         break
  //       case 'price-high':
  //         filteredMentors.sort((a, b) => b.price - a.price)
  //         break
  //       case 'experience':
  //         filteredMentors.sort((a, b) => {
  //           const experienceOrder = [
  //             'D1',
  //             'D1 + Pro',
  //             'D1 + NHL Draft',
  //             'D1 + NCAA Champion',
  //             'D1 + Olympic',
  //           ]
  //           return experienceOrder.indexOf(b.experience) - experienceOrder.indexOf(a.experience)
  //         })
  //         break
  //       case 'availability':
  //         filteredMentors.sort((a, b) => {
  //           const availabilityOrder = ['Available', 'Limited', 'Busy']
  //           return (
  //             availabilityOrder.indexOf(a.availability) - availabilityOrder.indexOf(b.availability)
  //           )
  //         })
  //         break
  //       default:
  //         filteredMentors.sort((a, b) => b.rating - a.rating)
  //     }
  //   } else {
  //     // Default sort by rating
  //     filteredMentors.sort((a, b) => b.rating - a.rating)
  //   }

  return filteredMentors
}
