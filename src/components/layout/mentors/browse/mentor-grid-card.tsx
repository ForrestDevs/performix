'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Share2, Star, Check } from 'lucide-react'
import { Mentor } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { prettifySkill } from '@/lib/utilities/prettify'
import { toast } from 'sonner'

interface MentorGridCardProps {
  mentor: Mentor
  index: number
}

export function MentorGridCard({ mentor, index }: MentorGridCardProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const profileUrl = `${window.location.origin}/mentors/${mentor.slug}`

    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Link copied to clipboard')
    } catch (err) {
      console.error('Failed to copy link:', err)
      toast.error('Failed to copy link')
    }
  }

  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative h-56 flex items-center justify-center">
          {typeof mentor.avatar === 'object' && (
            <MediaComponent
              resource={mentor.avatar!}
              className="w-full h-full rounded-lg"
              imgClassName="object-contain"
              fill
            />
          )}
          <div className="absolute top-3 left-3">
            <Badge className={`text-xs bg-green-500 text-white`}>Available</Badge>
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
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
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            </div>
          </div>
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
          <p className="text-sm text-gray-600 mb-3.5 line-clamp-2 flex-grow">{mentor.bio}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {mentor.skills?.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5">
                {prettifySkill(skill)}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
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
      </CardContent>
    </Card>
  )
}
