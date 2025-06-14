'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Share2, Play, Star, DollarSign } from 'lucide-react'
import Image from 'next/image'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { Mentor } from '@/payload-types'

interface MentorGridCardProps {
  mentor: Mentor
  index: number
}

export function MentorGridCard({ mentor, index }: MentorGridCardProps) {
  const visibleElements = useScrollAnimation()
  const isVisible = (id: string) => visibleElements.has(id)

  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer ${
        isVisible('mentor-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-0">
        <div className="relative h-56 bg-gradient-to-br from-[#0891B2]/10 to-[#8B5CF6]/10 overflow-hidden">
          <Image
            src="/mateo-hockey.png"
            alt={mentor.name}
            width={400}
            height={300}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            priority={index < 4}
          />
          {/* <div className="absolute top-3 left-3">
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
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 bg-white/90 hover:bg-white shadow-sm"
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
          {/* {mentor.videoIntro && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
              <Button
                size="lg"
                className="bg-white/95 text-[#0891B2] rounded-full w-14 h-14 p-0 shadow-lg"
              >
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
            </div>
          )} */}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              {/* <span className="text-sm font-medium">{mentor.rating}</span> */}
            </div>
          </div>
          <p className="text-[#0891B2] font-medium mb-2">{mentor.position}</p>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            {/* <span className="text-sm text-gray-600">{mentor.university}</span> */}
          </div>
          <p className="text-sm text-gray-600 mb-3.5 line-clamp-2">{mentor.bio}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {/* {mentor.specializations.slice(0, 3).map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs px-2 py-0.5">
                {spec}
              </Badge>
            ))} */}
          </div>
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center space-x-1 text-sm text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">${mentor.price}/hr</span>
            </div> */}
            <Button size="sm" className="bg-[#0891B2] hover:bg-[#0E7490] text-white px-4">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
