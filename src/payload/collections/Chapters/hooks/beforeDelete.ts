import { CollectionBeforeDeleteHook } from 'payload'
import { CHAPTERS_SLUG, LESSONS_SLUG } from '../../constants'
import { log } from '@/lib/utilities/log'

// Keep track of categories being deleted in the current batch
const pendingDeletions = new Set<string | number>()

export const beforeDelete: CollectionBeforeDeleteHook = async ({ req: { payload }, id }) => {
  log(`\n🗑️ Starting beforeDelete hook for chapter ID: ${id}`)
  pendingDeletions.add(id)

  try {
    // Check for children categories first
    log('🔍 Checking for child chapters...')
    const children = await payload.find({
      collection: CHAPTERS_SLUG,
      where: {
        'parent.id': { equals: id },
      },
    })

    if (children.totalDocs > 0) {
      log(`❌ Found ${children.totalDocs} child chapters, cannot delete`)
      const childrenTitles = children.docs.map((child) => `"${child.title}"`).join(', ')
      throw new Error(
        `Cannot delete chapter with children. Please remove or reassign these chapters first: ${childrenTitles}`,
      )
    }
    log('✅ No child categories found')

    // Check for assigned products
    log('🔍 Checking for assigned products...')
    const lessons = await payload.find({
      collection: LESSONS_SLUG,
      where: {
        chapters: { in: [id] },
      },
      limit: 100,
    })

    if (lessons.totalDocs > 0) {
      log(`❌ Found ${lessons.totalDocs} assigned lessons, cannot delete`)
      const lessonTitles = lessons.docs.map((lesson) => `"${lesson.title}"`).join(', ')
      const remainingCount = Math.max(0, lessons.totalDocs - 100)
      const additionalMessage = remainingCount > 0 ? ` and ${remainingCount} more products` : ''

      throw new Error(
        `Cannot delete chapter that has lessons assigned to it. Please remove or reassign these lessons first: ${lessonTitles}${additionalMessage}`,
      )
    }
    log('✅ No assigned products found')

    // Get category to update parent's isLeaf status after deletion
    log('🔍 Checking for parent chapter...')
    const category = await payload.findByID({
      collection: CHAPTERS_SLUG,
      id,
    })

    if (category?.parent) {
      const parentId = typeof category.parent === 'object' ? category.parent.id : category.parent
      log(`📌 Found parent category ID: ${parentId}`)

      log('🔍 Checking remaining siblings...')
      const siblings = await payload.find({
        collection: CHAPTERS_SLUG,
        where: {
          and: [
            { 'parent.id': { equals: parentId } },
            { id: { not_equals: id } },
            // Exclude other categories being deleted in this batch
            { id: { not_in: Array.from(pendingDeletions) } },
          ],
        },
      })
      log(`📊 Found ${siblings.totalDocs} remaining siblings (excluding pending deletions)`)

      // If this was the last remaining child, mark parent as leaf
      if (siblings.totalDocs === 0) {
        log(`📝 Updating parent ${parentId} to leaf status (no remaining children)`)
        await payload.update({
          collection: CHAPTERS_SLUG,
          id: parentId,
          data: { isLeaf: true },
          context: { isInternalOperation: true },
        })
        log('✅ Parent updated to leaf status')
      } else {
        log(`ℹ️ Parent remains non-leaf (has ${siblings.totalDocs} other children)`)
      }
    } else {
      log('ℹ️ No parent category found')
    }

    log('✅ beforeDelete hook completed successfully\n')
    return true
  } finally {
    // Clean up the tracking set after the operation completes
    pendingDeletions.delete(id)
  }
}
