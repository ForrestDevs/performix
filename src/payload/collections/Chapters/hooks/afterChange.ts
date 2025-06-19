import { BasePayload, CollectionAfterChangeHook, PayloadRequest } from 'payload'
import { CHAPTERS_SLUG } from '../../constants'
import { log } from '@/lib/utilities/log'
import { Chapter } from '@/payload-types'

/**
 * Updates the fullSlug for a category and all its descendants
 */
async function updateFullSlugHierarchy(req: PayloadRequest, chapter: Chapter): Promise<void> {
  log(`\n🔄 Starting updateFullSlugHierarchy for chapter: ${chapter.title} (${chapter.id})`)

  try {
    // Build the fullSlug for this category
    let fullSlug = chapter.slug
    log(`📌 Initial slug: ${fullSlug}`)

    if (chapter.parent) {
      log(`👆 Chapter has parent: ${JSON.stringify(chapter.parent)}`)
      const parentId = typeof chapter.parent === 'object' ? chapter.parent.id : chapter.parent
      log(`🔍 Looking up parent with ID: ${parentId}`)

      const parent = await req.payload.findByID({
        req,
        collection: CHAPTERS_SLUG,
        id: parentId,
      })

      if (parent) {
        log(`✅ Parent found: ${parent.title} with fullSlug: ${parent.fullSlug}`)
        fullSlug = `${parent.fullSlug}/${chapter.slug}`
        log(`📝 New fullSlug constructed: ${fullSlug}`)
      } else {
        log('⚠️ Parent not found!')
      }
    } else {
      log('ℹ️ No parent - this is a root category')
    }

    // Get all descendants before updating
    log(`\n🔍 Finding all immediate descendants of ${chapter.title}`)
    const descendants = await req.payload.find({
      req,
      collection: CHAPTERS_SLUG,
      where: {
        'parentChapter.id': { equals: chapter.id },
      },
    })
    log(`📊 Found ${descendants.totalDocs} immediate descendants`)

    // Update current category first
    log(`\n📝 Updating current chapter (${chapter.title}) with fullSlug: ${fullSlug}`)
    await req.payload.update({
      req,
      collection: CHAPTERS_SLUG,
      id: chapter.id,
      data: { fullSlug: fullSlug },
      context: { isInternalOperation: true, skipFullSlugUpdate: true },
    })

    // Update immediate descendants sequentially
    for (const child of descendants.docs) {
      const childFullSlug = `${fullSlug}/${child.slug}`
      log(`\n📝 Updating child ${child.title} with fullSlug: ${childFullSlug}`)
      await req.payload.update({
        req,
        collection: CHAPTERS_SLUG,
        id: child.id,
        data: { fullSlug: childFullSlug },
        context: { isInternalOperation: true, skipFullSlugUpdate: true },
      })

      // Recursively update child's descendants
      await updateFullSlugHierarchy(req, {
        ...child,
        fullSlug: childFullSlug,
      })
    }

    log(`✅ Completed fullSlug updates for ${chapter.title} and its descendants`)
  } catch (error) {
    console.error(`❌ Error in updateFullSlugHierarchy for ${chapter.title}:`, error)
    throw error
  }
}

export const afterChange: CollectionAfterChangeHook = async ({
  req,
  operation,
  doc,
  previousDoc,
  context = {},
}) => {
  log(`\n🎯 afterChange hook triggered for ${doc.title}`)
  log(`📋 Operation: ${operation}`)
  log(`🔑 Context:`, context)

  // Skip if this is an internal operation
  if (context.isInternalOperation) {
    log('⏭️ Skipping - internal operation')
    return doc
  }

  try {
    // Handle parent isLeaf updates
    if (operation === 'create' && doc.parent) {
      log('\n📝 Handling create operation with parent')
      const parentId = typeof doc.parent === 'object' ? doc.parent.id : doc.parent
      log(`🔄 Updating parent ${parentId} to non-leaf`)
      // Run parent update first
      await req.payload.update({
        req,
        collection: CHAPTERS_SLUG,
        id: parentId,
        data: { isLeaf: false },
        context: { isInternalOperation: true },
      })
    } else if (operation === 'update' && doc.parent !== previousDoc?.parent) {
      log('\n📝 Handling parent change')
      log(`Previous parent: ${JSON.stringify(previousDoc?.parent)}`)
      log(`New parent: ${JSON.stringify(doc.parent)}`)

      // Handle new parent first
      if (doc.parent) {
        const newParentId = typeof doc.parent === 'object' ? doc.parent.id : doc.parent
        log(`🔄 Updating new parent ${newParentId} to non-leaf`)
        const result = await req.payload.update({
          req,
          collection: CHAPTERS_SLUG,
          id: newParentId,
          data: { isLeaf: false },
          context: { isInternalOperation: true },
        })
        log('New parent update result isLeaf:', result.isLeaf)
      }

      // Then handle old parent
      if (previousDoc?.parent) {
        const oldParentId =
          typeof previousDoc.parent === 'object' ? previousDoc.parent.id : previousDoc.parent
        log(`🔍 Checking children count for old parent ${oldParentId}`)

        const oldParentChildren = await req.payload.find({
          req,
          collection: CHAPTERS_SLUG,
          where: {
            'parentChapter.id': { equals: oldParentId },
            id: { not_equals: doc.id },
          },
        })
        log(`📊 Old parent has ${oldParentChildren.totalDocs} remaining children`)

        await req.payload.update({
          req,
          collection: CHAPTERS_SLUG,
          id: oldParentId,
          data: { isLeaf: oldParentChildren.totalDocs === 0 },
          context: { isInternalOperation: true },
        })
      }

      // Finally update fullSlug hierarchy
      if (!context.skipFullSlugUpdate) {
        log('\n🔄 Starting fullSlug hierarchy update')
        await updateFullSlugHierarchy(req, doc)
      } else {
        log('⏭️ Skipping fullSlug update - already being handled')
      }
    }

    log('✅ afterChange hook completed\n')
    return doc
  } catch (error) {
    console.error('❌ Error in afterChange hook:', error)
    throw error
  }
}
