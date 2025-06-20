'use client'

import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import { useMentor } from './mentor-context'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { prettifySkill } from '@/lib/utilities/prettify'

interface MentorAboutProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export function MentorAbout({ sectionRef }: MentorAboutProps) {
  const { mentor } = useMentor()
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

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
        <div className="flex flex-wrap gap-2">
          {mentor.skills?.map((skill) => (
            <Badge key={skill} variant="outline" className="text-sm">
              {prettifySkill(skill)}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
