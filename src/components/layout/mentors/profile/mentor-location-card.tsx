'use client'

import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Check } from 'lucide-react'
import { useMentor } from './mentor-context'

export function MentorLocationCard() {
  const { mentor } = useMentor()

  // For now using the sample data structure - in real app this would come from the Mentor payload type
  const locationData = {
    city: 'Boston',
    state: 'MA',
    inPersonAvailable: true,
    travelRadius: 25,
  }

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video relative bg-gradient-to-br from-[#0891B2]/10 to-[#0E7490]/20">
          {/* Map placeholder - would be replaced with actual map component */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-[#0891B2] mx-auto mb-2" />
              <p className="text-sm text-gray-600">Interactive Map</p>
              <p className="text-xs text-gray-500">Coming Soon</p>
            </div>
          </div>

          {/* Location marker overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-[#0891B2] rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Location & Travel</h3>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-[#0891B2]" />
            <span className="text-gray-700">
              {locationData.city}, {locationData.state}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">In-person sessions available</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">
                Willing to travel up to {locationData.travelRadius} miles
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Virtual sessions available worldwide</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
