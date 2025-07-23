import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function VolumeLoadingCard() {
  return (
    <Card className="group relative overflow-hidden bg-white border-0 shadow-lg flex flex-col">
      {/* Background pattern skeleton */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden">
        <Skeleton className="w-full h-full transform rotate-12 translate-x-8 -translate-y-8" />
      </div>

      <CardHeader className="relative pb-4 pt-6 flex-grow">
        <div className="flex flex-col items-start gap-4">
          {/* Volume badge skeleton */}
          <Skeleton className="h-6 w-20 rounded-md" />
          
          <div className="flex flex-row items-center gap-4 w-full">
            {/* Thumbnail skeleton */}
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-2xl overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            
            {/* Title and subtitle skeleton */}
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 flex-grow pt-2">
        {/* Topics skeleton */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16 rounded-md" />
          ))}
        </div>

        {/* Progress skeleton */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="w-full h-2 rounded-full" />
        </div>

        {/* Lessons count skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      <CardFooter className="flex-grow">
        {/* Button skeleton */}
        <Skeleton className="h-12 w-full rounded-lg" />
      </CardFooter>
    </Card>
  )
}
