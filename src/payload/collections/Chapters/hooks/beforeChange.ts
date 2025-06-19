import { CollectionBeforeChangeHook } from 'payload'
import { CHAPTERS_SLUG } from '../../constants'
import { log } from '@/lib/utilities/log'

export const beforeChange: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  context,
}) => {
  log(`\n🔄 Starting beforeChange hook for ${data.title || 'new chapter'}`)
  log(`📋 Operation: ${operation}`)
  log(`📋 Context: ${JSON.stringify(context)}`)

  if (context.isInternalOperation) {
    log('🔄 Internal operation - skipping slug construction')
    return data
  }

  // Compute fullSlug
  let fullSlug = data.slug
  log(`📌 Initial slug: ${fullSlug}`)

  if (data.parent) {
    log(`👆 Chapter has parent: ${JSON.stringify(data.parent)}`)
    const parentId = typeof data.parent === 'object' ? data.parent.id : data.parent
    log(`🔍 Looking up parent with ID: ${parentId}`)

    const parent = await req.payload.findByID({
      req,
      collection: CHAPTERS_SLUG,
      id: parentId,
    })

    if (parent) {
      log(`✅ Parent found: ${parent.title} with fullSlug: ${parent.fullSlug}`)
      fullSlug = `${parent.fullSlug}/${data.slug}`
      log(`📝 New fullSlug constructed: ${fullSlug}`)
    } else {
      log('⚠️ Parent not found!')
    }
  } else {
    log('ℹ️ No parent - this is a root chapter')
  }

  log('✅ beforeChange hook completed')
  return {
    ...data,
    fullSlug,
  }
}
