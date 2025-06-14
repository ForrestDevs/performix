'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Instagram,
  Youtube,
  MapPin,
  Calendar,
  Star,
  Users,
  Award,
  Heart,
  Share2,
} from 'lucide-react'
import { useMentor } from './mentor-context'
import { Media as MediaComponent } from '@/components/Media'
import { Media } from '@/payload-types'

// TikTok Icon
function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.6 5.82C15.9 5.06 15.5 4.1 15.5 3H12.5V16C12.5 17.1 11.6 18 10.5 18C9.4 18 8.5 17.1 8.5 16C8.5 14.9 9.4 14 10.5 14C10.8 14 11.1 14.1 11.3 14.2V11.1C11.1 11.1 10.8 11 10.5 11C7.7 11 5.5 13.2 5.5 16C5.5 18.8 7.7 21 10.5 21C13.3 21 15.5 18.8 15.5 16V9.5C16.7 10.4 18.1 11 19.5 11V8C17.9 8 16.9 7.1 16.6 5.82Z"
        fill="currentColor"
      />
    </svg>
  )
}

// EliteProspects Icon
function EliteProspectsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5.5C13.24 5.5 14.25 6.51 14.25 7.75C14.25 8.99 13.24 10 12 10C10.76 10 9.75 8.99 9.75 7.75C9.75 6.51 10.76 5.5 12 5.5ZM17 17H7V15.5C7 13.83 10.33 13 12 13C13.67 13 17 13.83 17 15.5V17Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface MentorHeroProps {
  onBookingOpen: () => void
}

export function MentorHero({ onBookingOpen }: MentorHeroProps) {
  const { mentor } = useMentor()
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Hero Image with Parallax Effect */}
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
          <p className="text-xl text-white/90 max-w-2xl mb-6">{mentor.bio}</p>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5 text-[#0891B2]" />
              <span>{mentor.currentTeam}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Award className="h-5 w-5 text-[#0891B2]" />
              <span>{mentor.position}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <MapPin className="h-5 w-5 text-[#0891B2]" />
              <span>{/* {mentor.location.city}, {mentor.location.state} */}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              {/* <span>
                {mentor.reviews.reduce((acc, review) => acc + review.rating, 0) /
                  mentor.reviews.length}{' '}
                ({mentor.reviews.length} reviews)
              </span> */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
              onClick={onBookingOpen}
            >
              Book a Session
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0891B2]"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <>
                  <Heart className="mr-2 h-5 w-5 fill-current text-red-500" />
                  Saved
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  Save
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0891B2]"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Social Media Links */}
      {/* <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-8 right-8 flex space-x-3"
      >
        <Link
          href={`https://instagram.com/${mentor.socialMedia.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
        >
          <Instagram className="h-5 w-5" />
        </Link>
        <Link
          href={`https://tiktok.com/@${mentor.socialMedia.tiktok}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
        >
          <TikTokIcon />
        </Link>
        <Link
          href={`https://youtube.com/@${mentor.youtube}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
        >
          <Youtube className="h-5 w-5" />
        </Link>
        <Link
          href={`https://eliteprospects.com/player/${mentor.socialMedia.eliteProspects}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
        >
          <EliteProspectsIcon />
        </Link>
      </motion.div> */}
    </section>
  )
}
