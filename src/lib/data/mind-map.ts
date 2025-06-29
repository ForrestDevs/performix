export interface MindNode {
  id: string
  title: string
  description: string
  type: 'course' | 'module' | 'volume' | 'lesson'
  parentId?: string
  position?: { x: number; y: number }
  color?: string
  icon?: string
  content?: {
    overview?: string
    videos?: Array<{ title: string; url: string; duration: string }>
    files?: Array<{ title: string; url: string; type: string }>
    keyPoints?: string[]
  }
}

export const mindMapData: MindNode[] = [
  // Central Course Node
  {
    id: 'ultimate-performance-course',
    title: 'Ultimate Performance Mastery',
    description: 'The complete system for achieving peak performance in sports and life',
    type: 'course',
    position: { x: 0, y: 0 },
    color: '#8B5CF6',
    icon: '🎯',
    content: {
      overview:
        'This comprehensive course is designed to transform athletes into peak performers through a holistic approach covering physical, mental, and lifestyle optimization.',
      keyPoints: [
        'Complete performance transformation system',
        '4 core pillars of excellence',
        'Proven by elite athletes worldwide',
        'Practical implementation strategies',
      ],
    },
  },

  // Module 1: Fundamentals
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'Master the essential foundations of peak performance',
    type: 'module',
    parentId: 'ultimate-performance-course',
    position: { x: -450, y: -300 },
    color: '#10B981',
    icon: '🏗️',
    content: {
      overview:
        'Build unshakeable foundations with the core pillars that support all high-level performance.',
      keyPoints: [
        'Nutritional optimization strategies',
        'Sleep science and recovery protocols',
        'Training methodology fundamentals',
      ],
    },
  },

  // Module 2: Development
  {
    id: 'development',
    title: 'Development',
    description: 'Advanced strategies for continuous improvement and growth',
    type: 'module',
    parentId: 'ultimate-performance-course',
    position: { x: 450, y: -300 },
    color: '#F59E0B',
    icon: '📈',
    content: {
      overview:
        'Accelerate your development with cutting-edge training methodologies and performance optimization techniques.',
      keyPoints: [
        'Progressive overload principles',
        'Periodization mastery',
        'Skill acquisition frameworks',
      ],
    },
  },

  // Module 3: Mental Excellence
  {
    id: 'mental-excellence',
    title: 'Mental Excellence',
    description: 'Develop unbreakable mental strength and focus',
    type: 'module',
    parentId: 'ultimate-performance-course',
    position: { x: 450, y: 300 },
    color: '#EF4444',
    icon: '🧠',
    content: {
      overview:
        'Master the mental game with proven psychological strategies used by champion athletes.',
      keyPoints: [
        'Confidence building techniques',
        'Pressure performance protocols',
        'Visualization and mental rehearsal',
      ],
    },
  },

  // Module 4: Living It
  {
    id: 'living-it',
    title: 'Living It',
    description: 'Integrate performance principles into daily life',
    type: 'module',
    parentId: 'ultimate-performance-course',
    position: { x: -450, y: 300 },
    color: '#8B5CF6',
    icon: '⚡',
    content: {
      overview:
        'Transform knowledge into consistent action with practical implementation strategies and lifestyle design.',
      keyPoints: [
        'Daily routine optimization',
        'Habit formation systems',
        'Performance lifestyle design',
      ],
    },
  },

  // Fundamentals Volumes
  {
    id: 'nutrition',
    title: 'Nutrition',
    description: 'Fuel your body for optimal performance and recovery',
    type: 'volume',
    parentId: 'fundamentals',
    position: { x: -650, y: -200 },
    color: '#10B981',
    icon: '🥗',
    content: {
      overview:
        'Master the science of sports nutrition to optimize energy, recovery, and body composition.',
      keyPoints: [
        'Macronutrient timing strategies',
        'Hydration protocols',
        'Supplement optimization',
        'Pre/post workout nutrition',
      ],
    },
  },
  {
    id: 'sleep',
    title: 'Sleep',
    description: 'Optimize recovery through advanced sleep strategies',
    type: 'volume',
    parentId: 'fundamentals',
    position: { x: -350, y: -500 },
    color: '#10B981',
    icon: '😴',
    content: {
      overview:
        'Unlock the power of quality sleep for enhanced performance, recovery, and cognitive function.',
      keyPoints: [
        'Sleep architecture optimization',
        'Recovery sleep protocols',
        'Sleep environment design',
        'Circadian rhythm management',
      ],
    },
  },
  {
    id: 'training-recovery',
    title: 'Training Recovery',
    description: 'Advanced recovery methods for sustained performance',
    type: 'volume',
    parentId: 'fundamentals',
    position: { x: -250, y: -150 },
    color: '#10B981',
    icon: '🔄',
    content: {
      overview:
        'Implement cutting-edge recovery strategies to maximize training adaptations and prevent burnout.',
      keyPoints: [
        'Active recovery protocols',
        'Mobility and flexibility systems',
        'Recovery technology utilization',
        'Stress management techniques',
      ],
    },
  },

  // Development Volumes
  {
    id: 'development-essentials',
    title: 'Development Essentials',
    description: 'Core principles for systematic improvement',
    type: 'volume',
    parentId: 'development',
    position: { x: 650, y: -200 },
    color: '#F59E0B',
    icon: '⚙️',
    content: {
      overview:
        'Master the fundamental principles that drive continuous improvement and skill development.',
      keyPoints: [
        'Progressive overload principles',
        'Skill acquisition frameworks',
        'Performance tracking systems',
        'Goal setting methodologies',
      ],
    },
  },
  {
    id: 'off-season-training',
    title: 'Off-Season Training',
    description: 'Maximize your off-season for competitive advantage',
    type: 'volume',
    parentId: 'development',
    position: { x: 350, y: -500 },
    color: '#F59E0B',
    icon: '🏋️',
    content: {
      overview:
        'Transform your off-season into a competitive advantage with strategic training and development protocols.',
      keyPoints: [
        'Periodization planning',
        'Strength and conditioning focus',
        'Skill development priorities',
        'Mental preparation strategies',
      ],
    },
  },

  // Mental Excellence Volumes
  {
    id: 'confidence',
    title: 'Confidence',
    description: 'Build unshakeable self-belief and mental toughness',
    type: 'volume',
    parentId: 'mental-excellence',
    position: { x: 650, y: 200 },
    color: '#EF4444',
    icon: '💪',
    content: {
      overview:
        'Develop rock-solid confidence and mental resilience to perform under any circumstances.',
      keyPoints: [
        'Confidence building exercises',
        'Self-talk optimization',
        'Mental toughness training',
        'Pressure performance techniques',
      ],
    },
  },
  {
    id: 'greatness-videos',
    title: 'Greatness Videos',
    description: 'Inspiring content from elite performers and champions',
    type: 'volume',
    parentId: 'mental-excellence',
    position: { x: 350, y: 500 },
    color: '#EF4444',
    icon: '🎬',
    content: {
      overview:
        'Get inspired and learn from the mindset and strategies of world-class athletes and champions.',
      keyPoints: [
        'Champion mindset interviews',
        'Performance psychology insights',
        'Motivational training content',
        'Mental preparation rituals',
      ],
    },
  },

  // Living It Volumes
  {
    id: 'routines',
    title: 'Routines',
    description: 'Design powerful daily and weekly performance routines',
    type: 'volume',
    parentId: 'living-it',
    position: { x: -650, y: 200 },
    color: '#8B5CF6',
    icon: '📅',
    content: {
      overview:
        'Create structured routines that automatically drive peak performance and consistent results.',
      keyPoints: [
        'Morning routine optimization',
        'Pre-competition rituals',
        'Training day structure',
        'Recovery routine design',
      ],
    },
  },
  {
    id: 'challenges',
    title: 'Challenges',
    description: 'Push your limits with progressive challenges',
    type: 'volume',
    parentId: 'living-it',
    position: { x: -350, y: 500 },
    color: '#8B5CF6',
    icon: '🎯',
    content: {
      overview:
        'Test and expand your capabilities with carefully designed challenges that build character and performance.',
      keyPoints: [
        'Mental toughness challenges',
        'Physical capability tests',
        'Consistency challenges',
        'Comfort zone expansion',
      ],
    },
  },
  {
    id: 'methods',
    title: 'Methods',
    description: 'Proven methodologies for peak performance',
    type: 'volume',
    parentId: 'living-it',
    position: { x: -250, y: 150 },
    color: '#8B5CF6',
    icon: '🔬',
    content: {
      overview:
        'Apply scientifically-backed methods and systems to consistently achieve peak performance.',
      keyPoints: [
        'Performance measurement systems',
        'Optimization methodologies',
        'Tracking and analytics',
        'Continuous improvement protocols',
      ],
    },
  },
]

// Helper function to get children of a node
export function getNodeChildren(parentId: string): MindNode[] {
  return mindMapData.filter((node) => node.parentId === parentId)
}

// Helper function to get a node by ID
export function getNodeById(id: string): MindNode | undefined {
  return mindMapData.find((node) => node.id === id)
}

// Helper function to get the breadcrumb path for a node
export function getNodePath(nodeId: string): MindNode[] {
  const path: MindNode[] = []
  let currentNode = getNodeById(nodeId)

  while (currentNode) {
    path.unshift(currentNode)
    currentNode = currentNode.parentId ? getNodeById(currentNode.parentId) : undefined
  }

  return path
}
