import { getFeaturedMentors } from '@/lib/data/mentors'
import { FeaturedMentorsLoading } from '../home/featured-mentors/loading'
import { MentorCard } from '../home/featured-mentors/mentor-card'
import { Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Media as MediaComponent } from '@/components/Media'

export async function FeaturedMentors() {
  const mentors = await getFeaturedMentors()

  return (
    <Suspense fallback={<FeaturedMentorsLoading />}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {mentors.map((mentor, index) => (
          <Card
            key={index}
            id={`mentor-card-${index}`}
            data-scroll-animate
            className={`border-0 shadow-lg hover:shadow-xl transition-all duration-700 hover:-translate-y-1`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-[#0891B2]/20 to-[#8B5CF6]/20 mb-4 overflow-hidden relative">
                {typeof mentor.avatar === 'object' && (
                  <MediaComponent
                    resource={mentor.avatar!}
                    className="absolute inset-0"
                    imgClassName="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{mentor.name}</h3>
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
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{mentor.intro}</p>
              <Link
                href={`/mentors/${mentor.slug}`}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'w-full border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white mt-auto',
                )}
              >
                View Profile
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Suspense>
  )
}
