'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Check, Share2, Star } from 'lucide-react'
import { Media as MediaComponent } from '@/components/Media'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { type MentorSample } from '@/lib/mentors-utils'
import { Media, Mentor } from '@/payload-types'
import { useState } from 'react'

interface MentorCardProps {
  mentor: Mentor
  isVisible: (id: string) => boolean
  index: number
}

export function MentorCard({ mentor, isVisible, index }: MentorCardProps) {
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
    <Card
      key={mentor.id}
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer ${
        isVisible('mentor-grid') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-6">
          <div className="relative w-32 h-32 bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 rounded-xl overflow-hidden flex-shrink-0">
            {typeof mentor.avatar === 'object' && (
              <MediaComponent
                resource={mentor.avatar as Media}
                imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                priority
                fill
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
                {typeof mentor.school === 'object' && (
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full">
                      {typeof mentor.school?.logo === 'object' && (
                        <MediaComponent
                          resource={mentor.school?.logo}
                          imgClassName="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{mentor.school?.name}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="p-1.5 bg-white/90 hover:bg-white shadow-sm relative group"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Share2 className="h-4 w-4 text-gray-600" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{mentor.bio}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.skills?.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill?.skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  href={`/mentors/${mentor.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'w-full border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white',
                  )}
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
