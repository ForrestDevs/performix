import { CHAPTERS_SLUG } from '../../constants'

/**
 * Get all descendants of a category recursively
 * Returns an array of category documents in a flattened structure
 */
async function getDescendants(req: any, chapterId: string | number): Promise<any[]> {
  const descendants: any[] = []

  // Get immediate children first
  const children = await req.payload.find({
    collection: CHAPTERS_SLUG,
    where: {
      'parentChapter.id': { equals: chapterId },
    },
    depth: 0, // Minimize data fetched
  })

  // If no children, return empty array
  if (children.totalDocs === 0) {
    return descendants
  }

  // Add children to descendants
  descendants.push(...children.docs)

  // Get descendants of each child in parallel
  const childDescendants = await Promise.all(
    children.docs.map((child) => getDescendants(req, child.id)),
  )

  // Flatten and add all descendants
  descendants.push(...childDescendants.flat())

  return descendants
}

export default getDescendants
