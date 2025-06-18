'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Users, Award, Share2, Check } from 'lucide-react'
import { useMentor } from './mentor-context'
import { Media as MediaComponent } from '@/components/Media'
import { Media } from '@/payload-types'
import { EliteProspectsIcon, InstagramIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utilities/ui'
import Image from 'next/image'
import { getPosition } from '@/lib/utilities/postion'

export function MentorHero() {
  const { mentor } = useMentor()
  const [copied, setCopied] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const profileUrl = `${window.location.origin}/mentors/${mentor.slug}`

    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      // You could add a toast notification here to show success
    } catch (err) {
      console.error('Failed to copy link:', err)
      // You could add a toast notification here to show error
    }
  }

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <MediaComponent
          resource={mentor.avatar as Media}
          imgClassName="object-cover"
          priority
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge className="bg-[#0891B2] text-white mb-4">Elite Mentor</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk']">
            {mentor.name}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-6">{mentor.intro}</p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5 text-[#0891B2]" />
              <span>{mentor.currentTeam}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Award className="h-5 w-5 text-[#0891B2]" />
              <span>{getPosition(mentor.position)}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <MapPin className="h-5 w-5 text-[#0891B2]" />
              <span>{mentor.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`https://calendly.com/mateodixon/d1-mentorship-call`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'bg-[#0891B2] hover:bg-[#0E7490] text-white',
              )}
            >
              Book a Session
              <Calendar className="ml-2 h-5 w-5" />
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0891B2]"
              onClick={handleShare}
            >
              {copied ? <Check className="mr-2 h-5 w-5" /> : <Share2 className="mr-2 h-5 w-5" />}
              Share
            </Button>
            {mentor.socials?.eliteProspects && (
              <Link
                href={`${mentor.socials?.eliteProspects}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300 overflow-hidden"
              >
                <Image
                  src="/ep.jpeg"
                  alt="Elite Prospects"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}
            {mentor.socials?.instagram && (
              <Link
                href={`${mentor.socials?.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
              >
                <InstagramIcon />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
