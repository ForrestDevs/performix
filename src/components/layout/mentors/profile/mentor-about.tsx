'use client'

import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import { useMentor } from './mentor-context'
import { useScrollAnimation } from '../hooks/use-scroll-animation'

interface MentorAboutProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export function MentorAbout({ sectionRef }: MentorAboutProps) {
  const { mentor } = useMentor()
  const { isVisible } = useScrollAnimation()

  return (
    <section ref={sectionRef} id="about-section" className="scroll-mt-32">
      <div
        id="about-header"
        data-scroll-animate
        className={`mb-8 transition-all duration-1000 ${
          isVisible('about-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
          About {mentor.name.split(' ')[0]}
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">{mentor.bio}</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div
        id="skills-grid"
        data-scroll-animate
        className={`mt-12 transition-all duration-1000 ${
          isVisible('skills-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Expertise & Skills</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* {mentor.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{skill.name}</h4>
                <span className="text-[#0891B2] font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  className="h-2.5 rounded-full bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]"
                ></motion.div>
              </div>
              <p className="text-sm text-gray-600">{skill.description}</p>
            </div>
          ))} */}
        </div>
      </div>

      {/* Ages & Sports */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div
          id="ages-served"
          data-scroll-animate
          className={`transition-all duration-1000 ${
            isVisible('ages-served') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ages Served</h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Age Range:</span>
                <span className="font-medium text-gray-900">
                  {/* {mentor.agesServed.min} - {mentor.agesServed.max} years */}
                </span>
              </div>
              <div className="relative h-8 bg-gray-100 rounded-full mb-4">
                {/* {Array.from({ length: mentor.agesServed.max - mentor.agesServed.min + 1 }).map(
                  (_, i) => {
                    const age = mentor.agesServed.min + i
                    const isPreferred = mentor.agesServed.preferred.includes(age)
                    return (
                      <motion.div
                        key={age}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          isPreferred
                            ? 'bg-[#0891B2] text-white'
                            : 'bg-gray-200 text-gray-600 border border-gray-300'
                        }`}
                        style={{
                          left: `${
                            ((age - mentor.agesServed.min) /
                              (mentor.agesServed.max - mentor.agesServed.min)) *
                            100
                          }%`,
                        }}
                      >
                        {age}
                      </motion.div>
                    )
                  },
                )} */}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Preferred ages:</span>{' '}
                {/* {mentor.agesServed.preferred.join(', ')} */}
              </p>
            </CardContent>
          </Card>
        </div>

        <div
          id="sports-played"
          data-scroll-animate
          className={`transition-all duration-1000 ${
            isVisible('sports-played') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sports Experience</h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                {/* {mentor.sportsPlayed.map((sport, index) => (
                  <motion.div
                    key={sport}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 * index }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      sport === 'Hockey'
                        ? 'bg-[#0891B2]/10 text-[#0891B2] border border-[#0891B2]/20'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {sport === 'Hockey' && <CheckCircle className="h-4 w-4" />}
                    <span className="font-medium">{sport}</span>
                  </motion.div>
                ))} */}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Primary focus on hockey with additional experience in other sports for
                cross-training benefits.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
