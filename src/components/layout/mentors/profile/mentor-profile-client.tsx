'use client'

import { useRef } from 'react'
import { MentorProvider } from './mentor-context'
import { MentorHero } from './mentor-hero'
import { MentorAbout } from './mentor-about'
import { Mentor } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface MentorProfileClientProps {
  mentor: Mentor
}

export function MentorProfileClient({ mentor }: MentorProfileClientProps) {
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
  }

  return (
    <MentorProvider mentor={mentor}>
      <div className="min-h-screen bg-gray-50">
        <MentorHero />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-16">
              <MentorAbout sectionRef={sectionRefs.about} />
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-[#0891B2]/5 to-[#8B5CF6]/5 border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-600 mb-6">
                    Like what you see? Book a call with Mateo to see if this mentor is the right fit
                    for you and start your path to excellence today!
                  </p>
                  <Button
                    className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white"
                    onClick={() =>
                      window.open('https://calendly.com/mateodixon/d1-mentorship-call', '_blank')
                    }
                  >
                    Book a Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MentorProvider>
  )
}
