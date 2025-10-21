import React from 'react'
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { getVolumeById } from '@/lib/data/lab'
import { Badge } from '@/components/ui/badge'

export async function VolumeCard({ volumeId, hasPlan }: { volumeId: number; hasPlan: boolean }) {
  const volume = await getVolumeById(volumeId)

  if (!volume) return null

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 hover:shadow-2xl transition-all duration-400 rounded-3xl border-0 shadow-lg flex flex-col min-h-[340px] sm:min-h-[340px]">
      <Link href={`/lab/volume/${volume.slug}`} className="focus:outline-none" tabIndex={-1}>
        <div className="relative flex flex-col items-center pt-4 px-5 pb-2 w-full space-y-2">
          <div className="absolute top-3 right-4 z-20">
            <Badge
              className="rounded-full px-2 py-1 text-xs font-semibold tracking-wide shadow shadow-blue-400/30 bg-blue-400 text-white hover:bg-blue-400 "
              variant="secondary"
            >
              Vol. {(volume.order ?? 0) + 1}
            </Badge>
          </div>

          <div className="relative w-full flex justify-center mb-2">
            <div className="absolute inset-0 z-0 opacity-70 blur-2xl rounded-2xl bg-gradient-to-tr from-blue-300/40 via-blue-100/50 to-blue-500/20"></div>
            <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden">
              {volume.thumbnail && typeof volume.thumbnail === 'object' ? (
                <Image
                  src={volume.thumbnail.url ?? ''}
                  alt={volume.title}
                  width={208}
                  height={208}
                  className="w-full h-full object-cover "
                />
              ) : (
                <div className="w-full h-full bg-white/15 rounded-2xl" />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center text-center gap-0.5">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-[2px] leading-tight">
              {volume.title}
            </CardTitle>
            {volume.subtitle && (
              <CardDescription className="text-sm text-gray-600 opacity-80 line-clamp-2 mb-0">
                {volume.subtitle}
              </CardDescription>
            )}
          </div>
        </div>
      </Link>
      <CardFooter className="px-5 pb-4 pt-1 mt-auto">
        <Link
          href={`/lab/volume/${volume.slug}`}
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white border-0 shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-600/25 transition-all duration-300 group text-base font-semibold flex items-center justify-center min-h-[2.5rem] py-2',
          )}
        >
          {hasPlan ? (
            <div className="flex items-center gap-2">
              Explore Volume
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Star className="mr-2 h-4 w-4" />
              Preview Volume
            </div>
          )}
        </Link>
      </CardFooter>
    </Card>
  )
}
