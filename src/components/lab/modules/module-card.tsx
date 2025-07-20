import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Module } from '@/payload-types'
import Image from 'next/image'
import { ArrowRight, BookOpen, Star } from 'lucide-react'
import { cn } from '@/lib/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { getModuleCompletion } from '@/lib/data/lab'
import { Badge } from '@/components/ui/badge'

export async function ModuleCard({
  module,
  hasPlan,
  userId,
}: {
  module: Module
  hasPlan: boolean
  userId: number | undefined
}) {
  const progress = await getModuleCompletion({ moduleId: module.id, userId })

  return (
    <Card className="group relative overflow-hidden bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg flex flex-col">
      {module.thumbnail && typeof module.thumbnail === 'object' && (
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden">
          <Image
            src={module.thumbnail.url ?? ''}
            alt=""
            width={128}
            height={128}
            className="w-full h-full object-cover transform rotate-12 translate-x-8 -translate-y-8"
          />
        </div>
      )}

      <CardHeader className="relative pb-4 pt-6 flex-grow">
        <div className="flex flex-col items-start gap-4">
          <Badge className="w-fit rounded-md" variant="secondary">
            Module {(module.order ?? 0) + 1}
          </Badge>
          <div className="flex flex-row items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
              {module.thumbnail && typeof module.thumbnail === 'object' ? (
                <Image
                  src={module.thumbnail.url ?? ''}
                  alt={module.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-white/20 rounded-lg" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {module.title}
              </CardTitle>
              {module.subtitle && (
                <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {module.subtitle}
                </CardDescription>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 flex-grow pt-2">
        {module.topics && module.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {module.topics.slice(0, 3).map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
              >
                {topic.topic ?? ''}
              </span>
            ))}
            {module.topics.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                +{module.topics.length - 3} more
              </span>
            )}
          </div>
        )}

        {hasPlan && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {progress?.completionPercentage || 0}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                style={{ width: `${progress?.completionPercentage || 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{module.volumes?.docs?.length || 0} volumes</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{module.lessons?.docs?.length || 0} lessons</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-grow">
        <Link
          href={`/lab/module/${module.slug}`}
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group',
          )}
        >
          {hasPlan ? (
            <div className="flex items-center gap-2">
              <span>Continue Module</span>
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
