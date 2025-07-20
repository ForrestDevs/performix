import type { CollectionBeforeValidateHook } from 'payload'
import type { Lesson, Module } from '@/payload-types'
import { VOLUMES_SLUG } from '../../constants'

export const beforeChangeLabLesson: CollectionBeforeValidateHook<Lesson> = async ({
  data,
  req,
}) => {
  // If a volume is selected, automatically set the module based on that volume

  let labModule: number | Module | undefined
  if (data?.volume) {
    if (typeof data.volume === 'object' && data.volume.module) {
      const moduleId =
        typeof data.volume.module === 'object' ? data.volume.module.id : data.volume.module
      labModule = moduleId
    } else if (typeof data.volume === 'number') {
      try {
        const volume = await req.payload.findByID({
          collection: VOLUMES_SLUG,
          id: data.volume,
        })

        if (volume.module) {
          const moduleId = typeof volume.module === 'object' ? volume.module.id : volume.module
          labModule = moduleId
        }
      } catch (error) {
        req.payload.logger.error('Error fetching volume to set module:', error)
      }
    }
  }

  return {
    ...data,
    ...(labModule && { module: labModule }),
  }
}
