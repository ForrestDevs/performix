import { notFound } from 'next/navigation'
import { getMentorData, MentorProfileClient } from '@/components/layout/mentors/profile'
import { getMentor } from '@/lib/data/mentors'

interface MentorProfilePageProps {
  params: Promise<{ slug: string }>
}

export default async function MentorProfilePage(props: MentorProfilePageProps) {
  const params = await props.params
  const { slug } = params

  // Fetch mentor data on the server
  const mentor = await getMentor(slug)

  if (!mentor) {
    notFound()
  }

  return <MentorProfileClient mentor={mentor} />
}

// Generate metadata for SEO
export async function generateMetadata(props: MentorProfilePageProps) {
  const params = await props.params
  const { slug } = params

  const mentor = await getMentorData(slug)

  if (!mentor) {
    return {
      title: 'Mentor Not Found',
      description: 'The requested mentor profile could not be found.',
    }
  }

  return {
    title: `${mentor.name} - ${mentor.position} | Performix`,
    description: mentor.shortBio,
    openGraph: {
      title: `${mentor.name} - ${mentor.position}`,
      description: mentor.shortBio,
      images: [
        {
          url: mentor.heroImage,
          width: 1200,
          height: 630,
          alt: `${mentor.name} - ${mentor.position}`,
        },
      ],
    },
  }
}

// Sample mentor data
// const mentorData = {
//   id: 'jake-morrison',
//   name: 'Jake Morrison',
//   position: 'Forward',
//   currentTeam: 'Harvard University',
//   school: 'Harvard University',
//   age: 24,
//   location: {
//     city: 'Boston',
//     state: 'MA',
//     coordinates: {
//       lat: 42.3736,
//       lng: -71.1097,
//     },
//     inPersonAvailable: true,
//     travelRadius: 25,
//   },
//   bio: 'Former Harvard captain and 3x All-American with extensive recruiting experience. I specialize in helping forwards develop their offensive game and navigate the complex D1 recruiting landscape. Having gone through the process myself and helped dozens of players secure D1 commitments, I understand what it takes to stand out and make an impact. My coaching philosophy focuses on skill development, hockey IQ, and the mental aspects of the game that separate good players from great ones.',
//   shortBio:
//     '3x All-American forward with extensive recruiting experience. Helped 50+ players secure D1 commitments.',
//   avatar: '/placeholder.svg?height=400&width=400',
//   heroImage: '/placeholder.svg?height=1200&width=1800',
//   socialMedia: {
//     instagram: 'jakemorrison',
//     tiktok: 'jakemorrison',
//     youtube: 'jakemorrisonhockey',
//     eliteProspects: 'jake-morrison',
//   },
//   skills: [
//     {
//       name: 'Offensive Strategy',
//       level: 95,
//       description: 'Elite offensive zone tactics and scoring techniques',
//     },
//     {
//       name: 'Recruiting Guidance',
//       level: 98,
//       description: 'Expert knowledge of D1 recruiting process',
//     },
//     { name: 'Skating Technique', level: 90, description: 'Advanced edge work and power skating' },
//     {
//       name: 'Shot Development',
//       level: 92,
//       description: 'Precision shooting and release techniques',
//     },
//     { name: 'Hockey IQ', level: 96, description: 'Game awareness and decision-making' },
//     { name: 'Leadership', level: 94, description: 'Team captain experience and mentorship' },
//   ],
//   agesServed: {
//     min: 13,
//     max: 20,
//     preferred: [15, 16, 17, 18],
//   },
//   sportsPlayed: ['Hockey', 'Lacrosse', 'Golf'],
//   experience: [
//     {
//       title: 'Assistant Coach',
//       organization: 'Boston Junior Eagles',
//       location: 'Boston, MA',
//       startDate: '2022',
//       endDate: 'Present',
//       description: 'Developing elite AAA players and helping them navigate the recruiting process',
//       achievements: ['12 D1 commitments in 2 seasons', 'Regional championship 2023'],
//     },
//     {
//       title: 'Forward',
//       organization: 'Harvard University',
//       location: 'Cambridge, MA',
//       startDate: '2018',
//       endDate: '2022',
//       description: 'Team captain and 3x All-American',
//       achievements: ['ECAC Champion 2020', 'Hobey Baker Finalist 2022', 'Team Captain 2021-2022'],
//     },
//     {
//       title: 'Player',
//       organization: 'USHL Chicago Steel',
//       location: 'Chicago, IL',
//       startDate: '2016',
//       endDate: '2018',
//       description: 'Top-line forward in the USHL',
//       achievements: ['USHL Champion 2017', 'All-Star Team 2018', '30+ goals in 2017-2018 season'],
//     },
//   ],
//   gallery: [
//     {
//       type: 'image',
//       category: 'Action Shots',
//       url: '/placeholder.svg?height=600&width=800',
//       caption: 'Harvard vs. Yale rivalry game',
//     },
//     {
//       type: 'image',
//       category: 'Training Sessions',
//       url: '/placeholder.svg?height=600&width=800',
//       caption: 'Working with AAA players on shooting techniques',
//     },
//     {
//       type: 'video',
//       category: 'Game Highlights',
//       url: '/placeholder.svg?height=600&width=800',
//       caption: '2022 NCAA Tournament highlights',
//       videoId: 'abc123',
//     },
//     {
//       type: 'image',
//       category: 'Personal Content',
//       url: '/placeholder.svg?height=600&width=800',
//       caption: 'Receiving All-American honors',
//     },
//     {
//       type: 'image',
//       category: 'Action Shots',
//       url: '/placeholder.svg?height=600&width=800',
//       caption: 'ECAC Championship game-winning goal',
//     },
//     {
//       type: 'video',
//       category: 'Training Sessions',
//       url: '/placeholder.svg?height=600&width=800',
//       caption: 'Offensive zone entry drills explanation',
//       videoId: 'def456',
//     },
//   ],
//   sessionTypes: [
//     {
//       name: '1-on-1 Skill Development',
//       duration: 60,
//       price: 150,
//       description: 'Personalized skill work focused on your specific needs and position',
//     },
//     {
//       name: 'Video Analysis',
//       duration: 45,
//       price: 125,
//       description: 'Detailed breakdown of game footage with actionable improvement strategies',
//     },
//     {
//       name: 'Recruiting Strategy Session',
//       duration: 60,
//       price: 175,
//       description: 'Comprehensive recruiting plan development and guidance',
//     },
//     {
//       name: 'Group Skills Session (3-5 players)',
//       duration: 90,
//       price: 100,
//       description: 'Small group training focused on position-specific skills',
//     },
//   ],
//   availability: {
//     monday: ['16:00', '17:00', '18:00', '19:00'],
//     tuesday: ['15:00', '16:00', '17:00', '18:00'],
//     wednesday: ['16:00', '17:00', '18:00', '19:00'],
//     thursday: ['15:00', '16:00', '17:00', '18:00'],
//     friday: ['16:00', '17:00', '18:00', '19:00'],
//     saturday: ['09:00', '10:00', '11:00', '12:00', '13:00'],
//     sunday: ['09:00', '10:00', '11:00', '12:00', '13:00'],
//   },
//   reviews: [
//     {
//       id: 1,
//       studentName: 'Alex Johnson',
//       studentAvatar: '/placeholder.svg?height=60&width=60',
//       rating: 5,
//       date: '2023-05-15',
//       text: "Jake's mentorship completely transformed my game. His attention to detail and personalized approach helped me secure a D1 commitment to Boston University. The video analysis sessions were game-changers for my offensive awareness.",
//       sessionType: '1-on-1 Skill Development',
//       progress: {
//         before: 'AAA Midget',
//         after: 'D1 Commit - Boston University',
//       },
//     },
//     {
//       id: 2,
//       studentName: 'Sarah Chen',
//       studentAvatar: '/placeholder.svg?height=60&width=60',
//       rating: 5,
//       date: '2023-04-22',
//       text: "Working with Jake on my recruiting strategy opened doors I didn't know existed. His network and knowledge of the process are unmatched. Within 3 months of working together, I had multiple D1 offers to choose from.",
//       sessionType: 'Recruiting Strategy Session',
//       progress: {
//         before: '0 D1 offers',
//         after: '4 D1 offers - Committed to Michigan',
//       },
//     },
//     {
//       id: 3,
//       studentName: 'Mike Rodriguez',
//       studentAvatar: '/placeholder.svg?height=60&width=60',
//       rating: 5,
//       date: '2023-03-10',
//       text: "The group sessions with Jake are incredible value. Even in a small group setting, he provides personalized feedback and creates drills that address everyone's needs. My shot release and accuracy improved dramatically.",
//       sessionType: 'Group Skills Session',
//       progress: {
//         before: '15 goals in previous season',
//         after: '32 goals this season',
//       },
//     },
//   ],
//   successMetrics: {
//     studentsHelped: 73,
//     d1Commitments: 50,
//     averageImprovement: '42%',
//     successRate: 96,
//   },
//   faqs: [
//     {
//       question: 'How do sessions typically work?',
//       answer:
//         "Sessions are tailored to your specific needs and goals. We'll start with an assessment, develop a plan, and focus on the areas that will have the biggest impact on your game. Each session includes a mix of skill work, tactical understanding, and mental preparation.",
//     },
//     {
//       question: 'Do you offer virtual sessions?',
//       answer:
//         'Yes! I offer virtual video analysis and recruiting strategy sessions. These are conducted via Zoom and include screen sharing for detailed breakdowns and interactive discussions.',
//     },
//     {
//       question: 'How often should we meet for optimal results?',
//       answer:
//         'For most players, I recommend weekly sessions during the season and twice-weekly during the off-season. Consistency is key to development, but we can adjust based on your schedule and budget.',
//     },
//     {
//       question: 'What equipment should I bring to sessions?',
//       answer:
//         "For on-ice sessions, bring full equipment. For off-ice, athletic wear and hockey stick. For video analysis, just bring yourself and any footage you'd like to review. I provide all training aids and technology needed.",
//     },
//   ],
// }
