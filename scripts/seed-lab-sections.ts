import { getPayload } from '../src/lib/utilities/getPayload'

const MEDIA_THUMBNAIL_ID = 3
const VIDEO_INTRO_ID = 4
const VIDEO_CONTENT_IDS = [2, 3]
const MEDIA_DOWNLOAD_ID = 6

async function seedLabData() {
  const payload = await getPayload()

  console.log('🚀 Starting Lab Sections seed...')

  try {
    // 1. Create Modules with nested Volumes and Lessons
    console.log('📚 Creating nested modules with volumes and lessons...')

    const speedModule = await payload.create({
      collection: 'modules',
      data: {
        title: 'Speed Development Mastery',
        subtitle: 'Master the fundamentals of speed training',
        slug: 'speed-development-mastery',
        thumbnail: MEDIA_THUMBNAIL_ID,
        introVideo: VIDEO_INTRO_ID,
        topics: [{ topic: 'Sprinting' }, { topic: 'Acceleration' }, { topic: 'Top Speed' }],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Comprehensive speed development program covering all aspects of sprinting mechanics, training methodology, and performance optimization.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
      },
    })

    const agilityModule = await payload.create({
      collection: 'modules',
      data: {
        title: 'Agility & Lateral Movement',
        subtitle: 'Develop explosive change of direction abilities',
        slug: 'agility-lateral-movement',
        thumbnail: MEDIA_THUMBNAIL_ID,
        introVideo: VIDEO_INTRO_ID,
        topics: [
          { topic: 'Change of Direction' },
          { topic: 'Lateral Movement' },
          { topic: 'Reactive Agility' },
        ],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Advanced agility training protocols for developing superior change of direction and reactive movement skills.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 1,
      },
    })

    // Create Volumes for Speed Module
    const speedFoundationsVolume = await payload.create({
      collection: 'volumes',
      data: {
        title: 'Speed Foundations',
        subtitle: 'Essential concepts and fundamentals',
        slug: 'speed-foundations',
        thumbnail: MEDIA_THUMBNAIL_ID,
        introVideo: VIDEO_INTRO_ID,
        module: speedModule.id,
        topics: [{ topic: 'Mechanics' }, { topic: 'Fundamentals' }],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Master the fundamental principles of speed development including biomechanics, force production, and movement efficiency.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
      },
    })

    const speedTrainingVolume = await payload.create({
      collection: 'volumes',
      data: {
        title: 'Speed Training Methods',
        subtitle: 'Advanced training protocols and progressions',
        slug: 'speed-training-methods',
        thumbnail: MEDIA_THUMBNAIL_ID,
        introVideo: VIDEO_INTRO_ID,
        module: speedModule.id,
        topics: [{ topic: 'Training Methods' }, { topic: 'Periodization' }],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Comprehensive training methodologies for developing maximum speed including block periodization and advanced protocols.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 1,
      },
    })

    // Create Volume for Agility Module
    const agilityFundamentalsVolume = await payload.create({
      collection: 'volumes',
      data: {
        title: 'Agility Fundamentals',
        subtitle: 'Core agility concepts and techniques',
        slug: 'agility-fundamentals',
        thumbnail: MEDIA_THUMBNAIL_ID,
        introVideo: VIDEO_INTRO_ID,
        module: agilityModule.id,
        topics: [{ topic: 'COD Mechanics' }, { topic: 'Footwork' }],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Essential agility skills including change of direction mechanics, footwork patterns, and reactive training principles.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
      },
    })

    // 2. Create Standalone Volume (not part of nested structure)
    console.log('📁 Creating standalone volumes...')

    const mentalPerformanceVolume = await payload.create({
      collection: 'volumes',
      data: {
        title: 'Mental Performance Mastery',
        subtitle: 'Psychological aspects of elite performance',
        slug: 'mental-performance-mastery',
        thumbnail: MEDIA_THUMBNAIL_ID,
        introVideo: VIDEO_INTRO_ID,
        // Note: No module assigned - this is standalone
        topics: [{ topic: 'Mindset' }, { topic: 'Visualization' }, { topic: 'Focus' }],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Develop the mental skills necessary for peak performance including visualization, focus training, and competitive mindset development.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
      },
    })

    // 3. Create Lessons for nested structure
    console.log('📖 Creating lessons for nested structure...')

    // Speed Foundations Volume Lessons
    const speedMechanicsLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Sprint Mechanics Fundamentals',
        subtitle: 'Understanding optimal sprinting form',
        slug: 'sprint-mechanics-fundamentals',
        module: speedModule.id,
        volume: speedFoundationsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Learn the biomechanical principles of efficient sprinting including posture, arm action, and leg mechanics.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: true,
      },
    })

    const accelerationLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Acceleration Techniques',
        subtitle: 'Mastering the start and acceleration phase',
        slug: 'acceleration-techniques',
        module: speedModule.id,
        volume: speedFoundationsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Master the critical acceleration phase with proper body positioning, ground contact, and progressive velocity development.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 1,
        isPreview: false,
      },
    })

    const topSpeedLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Top Speed Development',
        subtitle: 'Achieving and maintaining maximum velocity',
        slug: 'top-speed-development',
        module: speedModule.id,
        volume: speedFoundationsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Develop maximum velocity through optimal stride mechanics, relaxation techniques, and speed endurance protocols.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 2,
        isPreview: false,
      },
    })

    // Speed Training Methods Volume Lessons
    const blockPeriodizationLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Block Periodization for Speed',
        subtitle: 'Structured training progression methods',
        slug: 'block-periodization-speed',
        module: speedModule.id,
        volume: speedTrainingVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Learn how to structure training using block periodization principles for maximum speed development.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: false,
      },
    })

    const plyometricsLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Plyometrics for Speed',
        subtitle: 'Explosive power development protocols',
        slug: 'plyometrics-for-speed',
        module: speedModule.id,
        volume: speedTrainingVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Implement plyometric training protocols specifically designed to enhance sprinting performance and power output.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 1,
        isPreview: false,
      },
    })

    const recoveryLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Recovery and Regeneration',
        subtitle: 'Optimizing adaptation through proper recovery',
        slug: 'recovery-regeneration',
        module: speedModule.id,
        volume: speedTrainingVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Master recovery protocols including sleep optimization, nutrition strategies, and active recovery methods.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 2,
        isPreview: false,
      },
    })

    // Agility Fundamentals Volume Lessons
    const codMechanicsLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Change of Direction Mechanics',
        subtitle: 'Efficient cutting and direction change techniques',
        slug: 'cod-mechanics',
        module: agilityModule.id,
        volume: agilityFundamentalsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Master the biomechanics of efficient direction changes including body positioning, foot placement, and force application.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: true,
      },
    })

    const lateralMovementLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Lateral Movement Patterns',
        subtitle: 'Side-to-side movement efficiency',
        slug: 'lateral-movement-patterns',
        module: agilityModule.id,
        volume: agilityFundamentalsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Develop efficient lateral movement patterns for sports requiring quick side-to-side actions.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 1,
        isPreview: false,
      },
    })

    const reactiveAgilityLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Reactive Agility Training',
        subtitle: 'Decision-making under pressure',
        slug: 'reactive-agility-training',
        module: agilityModule.id,
        volume: agilityFundamentalsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Train reactive agility through decision-making drills and unpredictable movement patterns.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 2,
        isPreview: false,
      },
    })

    const agilityTestingLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Agility Testing Protocols',
        subtitle: 'Assessment and measurement strategies',
        slug: 'agility-testing-protocols',
        module: agilityModule.id,
        volume: agilityFundamentalsVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Learn various agility testing protocols and how to assess progress in change of direction abilities.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 3,
        isPreview: false,
      },
    })

    // Mental Performance Volume Lessons (standalone)
    const visualizationLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Visualization Techniques',
        subtitle: 'Mental imagery for performance enhancement',
        slug: 'visualization-techniques',
        // No module - standalone lesson in standalone volume
        volume: mentalPerformanceVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Master mental imagery and visualization techniques to enhance performance and skill acquisition.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: true,
      },
    })

    const focusTrainingLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Focus and Concentration Training',
        subtitle: 'Developing unwavering mental focus',
        slug: 'focus-concentration-training',
        volume: mentalPerformanceVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Develop laser-like focus and concentration abilities critical for peak performance under pressure.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 1,
        isPreview: false,
      },
    })

    const competitiveMindsetLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Competitive Mindset Development',
        subtitle: 'Building a championship mentality',
        slug: 'competitive-mindset-development',
        volume: mentalPerformanceVolume.id,
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Cultivate the mental toughness and competitive drive necessary for championship-level performance.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 2,
        isPreview: false,
      },
    })

    // 4. Create completely standalone lessons (no module or volume)
    console.log('📝 Creating standalone lessons...')

    const nutritionLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Performance Nutrition Essentials',
        subtitle: 'Fueling your body for optimal performance',
        slug: 'performance-nutrition-essentials',
        // No module or volume - completely standalone
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Master the fundamentals of performance nutrition including macronutrient timing, hydration strategies, and supplementation.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: true,
      },
    })

    const injuryPreventionLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Injury Prevention Strategies',
        subtitle: 'Stay healthy and perform consistently',
        slug: 'injury-prevention-strategies',
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Implement comprehensive injury prevention protocols including movement screening, corrective exercises, and load management.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: false,
      },
    })

    const biomechanicsLesson = await payload.create({
      collection: 'lessons',
      data: {
        title: 'Movement Biomechanics Analysis',
        subtitle: 'Understanding efficient human movement',
        slug: 'movement-biomechanics-analysis',
        videos: VIDEO_CONTENT_IDS,
        downloads: [MEDIA_DOWNLOAD_ID],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Analyze movement patterns using biomechanical principles to optimize technique and performance efficiency.',
                  },
                ],
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        },
        order: 0,
        isPreview: false,
      },
    })

    // 5. Create LabSections to test different organization patterns
    console.log('🗂️ Creating LabSections...')

    // Getting Started Section - Mixed content with beginner-friendly items
    const gettingStartedSection = await payload.create({
      collection: 'lab-sections',
      data: {
        title: 'Getting Started',
        subtitle: 'Essential content for beginners new to performance training',
        contentType: 'mixed',
        order: 0,
        // Mixed content: some lessons from different contexts
        lessons: [
          speedMechanicsLesson.id, // From nested structure
          visualizationLesson.id, // From standalone volume
          nutritionLesson.id, // Completely standalone
        ],
        modules: [speedModule.id], // Include the speed module
        volumes: [],
      },
    })

    // Quick Lessons Section - Only standalone lessons
    const quickLessonsSection = await payload.create({
      collection: 'lab-sections',
      data: {
        title: 'Quick Learning Sessions',
        subtitle: 'Focused lessons you can complete in under 30 minutes',
        contentType: 'lessons',
        order: 1,
        lessons: [
          speedMechanicsLesson.id,
          lateralMovementLesson.id,
          agilityTestingLesson.id,
          visualizationLesson.id,
        ],
        modules: [],
        volumes: [],
      },
    })

    // Core Modules Section - Traditional module display
    const coreModulesSection = await payload.create({
      collection: 'lab-sections',
      data: {
        title: 'Core Training Modules',
        subtitle: 'Comprehensive training modules for systematic skill development',
        contentType: 'modules',
        order: 2,
        modules: [speedModule.id, agilityModule.id],
        lessons: [],
        volumes: [],
      },
    })

    // Specialized Volumes Section - Mix of nested and standalone volumes
    const specializedVolumesSection = await payload.create({
      collection: 'lab-sections',
      data: {
        title: 'Specialized Training Volumes',
        subtitle: 'Focused training volumes for specific skill development',
        contentType: 'volumes',
        order: 3,
        volumes: [
          speedTrainingVolume.id, // From nested structure
          mentalPerformanceVolume.id, // Standalone volume
        ],
        modules: [],
        lessons: [],
      },
    })

    // Advanced Content Section - High-level mixed content
    const advancedSection = await payload.create({
      collection: 'lab-sections',
      data: {
        title: 'Advanced Performance',
        subtitle: 'Elite-level training content for experienced athletes',
        contentType: 'mixed',
        order: 4,
        modules: [],
        volumes: [speedTrainingVolume.id],
        lessons: [blockPeriodizationLesson.id, biomechanicsLesson.id, competitiveMindsetLesson.id],
      },
    })

    // Fundamentals Section - Foundation lessons from different areas
    const fundamentalsSection = await payload.create({
      collection: 'lab-sections',
      data: {
        title: 'Performance Fundamentals',
        subtitle: 'Core concepts every athlete should master',
        contentType: 'lessons',
        order: 5,
        lessons: [
          speedMechanicsLesson.id,
          codMechanicsLesson.id,
          visualizationLesson.id,
          nutritionLesson.id,
          injuryPreventionLesson.id,
        ],
        modules: [],
        volumes: [],
      },
    })

    console.log('✅ Lab Sections seed completed successfully!')
    console.log('\n📊 Created:')
    console.log(`   📚 2 Modules (nested with volumes/lessons)`)
    console.log(`   📁 4 Volumes (3 nested + 1 standalone)`)
    console.log(`   📖 13 Lessons (10 nested + 3 standalone)`)
    console.log(`   🗂️ 6 LabSections (testing different content types)`)

    console.log('\n🧪 Test Cases Created:')
    console.log('   ✓ Nested structure: Module → Volume → Lessons')
    console.log('   ✓ Standalone volumes with lessons')
    console.log('   ✓ Completely standalone lessons')
    console.log('   ✓ Mixed content sections')
    console.log('   ✓ Single content type sections')
    console.log('   ✓ Direct access routing scenarios')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  }
}

// Run the seed function
seedLabData()
  .then(() => {
    console.log('🎉 Seeding completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  })
