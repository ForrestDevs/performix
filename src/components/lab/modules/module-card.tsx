import React from 'react'
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { ArrowRight, Star } from 'lucide-react'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { getModuleById } from '@/lib/data/lab'

export async function ModuleCard({ moduleId, hasPlan }: { moduleId: number; hasPlan: boolean }) {
  const labModule = await getModuleById(moduleId)

  if (!labModule) return null

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 hover:shadow-2xl transition-all duration-400 rounded-3xl border-0 shadow-lg flex flex-col min-h-[340px] sm:min-h-[340px]">
      <Link href={`/lab/module/${labModule.slug}`} className="focus:outline-none" tabIndex={-1}>
        <div className="relative flex flex-col items-center pt-4 px-5 pb-2 w-full space-y-4">
          <div className="relative w-full flex justify-center mb-2">
            <div className="absolute inset-0 z-0 opacity-70 blur-2xl rounded-2xl bg-gradient-to-tr from-blue-300/40 via-blue-100/50 to-blue-500/20"></div>
            <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden">
              {labModule.thumbnail && typeof labModule.thumbnail === 'object' ? (
                <Image
                  src={labModule.thumbnail.url ?? ''}
                  alt={labModule.title}
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
              {labModule.title}
            </CardTitle>
            {labModule.subtitle && (
              <CardDescription className="text-sm text-gray-600 opacity-80 line-clamp-2 mb-0">
                {labModule.subtitle}
              </CardDescription>
            )}
          </div>
          {labModule.topics && labModule.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {labModule.topics.slice(0, 3).map((topic, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {topic.topic ?? ''}
                </span>
              ))}
              {labModule.topics.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                  +{labModule.topics.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      <CardFooter className="flex-grow">
        <Link
          href={`/lab/module/${labModule.slug}`}
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white border-0 shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-600/25 transition-all duration-300 group text-base font-semibold flex items-center justify-center min-h-[2.5rem] py-2',
          )}
        >
          {hasPlan ? (
            <div className="flex items-center gap-2">
              <span>Explore Module</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Preview Module</span>
            </div>
          )}
        </Link>
      </CardFooter>
    </Card>
  )
}
