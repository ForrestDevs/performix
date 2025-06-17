'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MentorProvider, type MentorData } from './mentor-context'
import { MentorHero } from './mentor-hero'
import { MentorNavigation } from './mentor-navigation'
import { MentorAbout } from './mentor-about'
import { MentorLocationCard } from './mentor-location-card'
import { MentorContactCard } from './mentor-contact-card'
import { Mentor } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { MentorBookingModal } from './mentor-booking-modal'

interface MentorProfileClientProps {
  //   mentor: MentorData
  mentor: Mentor
}

export function MentorProfileClient({ mentor }: MentorProfileClientProps) {
  const [activeTab, setActiveTab] = useState('about')
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    // skills: useRef<HTMLDivElement>(null),
    // gallery: useRef<HTMLDivElement>(null),
    // reviews: useRef<HTMLDivElement>(null),
    // availability: useRef<HTMLDivElement>(null),
  }

  return (
    <MentorProvider mentor={mentor}>
      <div className="min-h-screen bg-gray-50">
        <MentorHero />

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* About Section */}
              <MentorAbout sectionRef={sectionRefs.about} />

              {/* TODO: Add other sections */}
              {/* <MentorExperience sectionRef={sectionRefs.experience} />
              <MentorGallery sectionRef={sectionRefs.gallery} />
              <MentorReviews sectionRef={sectionRefs.reviews} />
              <MentorAvailability sectionRef={sectionRefs.availability} /> */}
            </div>

            {/* Right Column - Sidebar */}
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

              {/* Location Card */}
              {/* <MentorLocationCard /> */}

              {/* Contact Card */}
              {/* <MentorContactCard onScheduleCall={() => setIsBookingOpen(true)} /> */}

              {/* TODO: Add other sidebar components */}
              {/* <MentorProfileCard onBookingOpen={() => setIsBookingOpen(true)} />
              <MentorFAQCard /> */}
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        {/* <section className="bg-gradient-to-r from-[#0891B2] to-[#0E7490] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6 font-['Space_Grotesk']">
                Ready to Take Your Game to the Next Level?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Join the {mentor.successMetrics.studentsHelped}+ players who have secured D1
                commitments with {mentor.name.split(' ')[0]}&apos;s mentorship. Book your session
                today and start your journey to hockey excellence.
              </p>
            </div>
          </div>
        </section> */}

        {/* Booking Modal */}
        {/* <MentorBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} /> */}
      </div>
    </MentorProvider>
  )
}
