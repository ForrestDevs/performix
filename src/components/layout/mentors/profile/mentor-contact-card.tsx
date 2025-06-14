'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Instagram, Youtube, Calendar } from 'lucide-react'
import { useMentor } from './mentor-context'

// TikTok Icon
function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5.5C13.24 5.5 14.25 6.51 14.25 7.75C14.25 8.99 13.24 10 12 10C10.76 10 9.75 8.99 9.75 7.75C9.75 6.51 10.76 5.5 12 5.5ZM17 17H7V15.5C7 13.83 10.33 13 12 13C13.67 13 17 13.83 17 15.5V17Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface MentorContactCardProps {
  onScheduleCall?: () => void
}

export function MentorContactCard({ onScheduleCall }: MentorContactCardProps) {
  const { mentor } = useMentor()

  // For now using sample social media data - in real app this would come from the Mentor payload type
  const socialMedia = {
    instagram: 'jakemorrison',
    tiktok: 'jakemorrison',
    youtube: 'jakemorrisonhockey',
    eliteProspects: 'jake-morrison',
  }

  const handleScheduleCall = () => {
    if (onScheduleCall) {
      onScheduleCall()
    } else {
      // Default action - could open a booking modal or redirect to booking page
      console.log('Schedule call clicked')
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Connect & Schedule</h3>

        {/* Social Media Links */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Follow on Social</h4>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`https://instagram.com/${socialMedia.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#0891B2] hover:bg-[#0891B2]/5 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-[#0891B2]">
                  Instagram
                </p>
                <p className="text-xs text-gray-500 truncate">@{socialMedia.instagram}</p>
              </div>
            </Link>

            <Link
              href={`https://tiktok.com/@${socialMedia.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#0891B2] hover:bg-[#0891B2]/5 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <TikTokIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-[#0891B2]">
                  TikTok
                </p>
                <p className="text-xs text-gray-500 truncate">@{socialMedia.tiktok}</p>
              </div>
            </Link>

            <Link
              href={`https://youtube.com/@${socialMedia.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#0891B2] hover:bg-[#0891B2]/5 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <Youtube className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-[#0891B2]">
                  YouTube
                </p>
                <p className="text-xs text-gray-500 truncate">@{socialMedia.youtube}</p>
              </div>
            </Link>

            <Link
              href={`https://eliteprospects.com/player/${socialMedia.eliteProspects}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#0891B2] hover:bg-[#0891B2]/5 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <EliteProspectsIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-[#0891B2]">
                  Elite Prospects
                </p>
                <p className="text-xs text-gray-500 truncate">{socialMedia.eliteProspects}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Schedule Call Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Ready to Get Started?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Schedule a call to discuss your goals and see if we&apos;re a good fit for mentorship.
          </p>
          <Button
            onClick={handleScheduleCall}
            className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white"
            size="lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Call
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">Free 15-minute consultation</p>
        </div>
      </CardContent>
    </Card>
  )
}
