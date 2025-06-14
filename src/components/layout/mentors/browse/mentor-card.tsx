'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Share2, Star } from 'lucide-react'
import { Media as MediaComponent } from '@/components/Media'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { type MentorSample } from '@/lib/mentors-utils'
import { Media, Mentor } from '@/payload-types'

interface MentorCardProps {
  mentor: Mentor
  isVisible: (id: string) => boolean
  index: number
}

export function MentorCard({ mentor, isVisible, index }: MentorCardProps) {
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
            <MediaComponent
              resource={mentor as Media}
              imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              priority
              fill
            />

            {/* <Image
              src="/mateo-hockey.png"
              alt={mentor.name}
              width={128}
              height={128}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            /> */}
            {/* <div className="absolute top-2 right-2">
              <Badge
                className={`text-xs ${
                  mentor.availability === 'Available'
                    ? 'bg-green-500'
                    : mentor.availability === 'Limited'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                } text-white`}
              >
                {mentor.availability}
              </Badge>
            </div> */}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  {/* <span className="text-sm text-gray-600">{mentor.university}</span> */}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Share2 className="h-5 w-5 text-gray-400" />
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
              <div className="flex items-center space-x-6">
                {/* <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                  <span className="text-sm text-gray-500">({mentor.reviews} reviews)</span>
                </div> */}
                {/* <div className="text-sm text-gray-600">
                  <span className="font-medium">{mentor.studentsHelped}</span> students helped
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{mentor.successRate}%</span> success rate
                </div> */}
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/mentors/${mentor.slug}`}
                  className={cn(buttonVariants(), 'bg-[#0891B2] hover:bg-[#0E7490] text-white')}
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
