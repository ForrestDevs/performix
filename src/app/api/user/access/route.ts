import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/utilities/getPayload'
import { getCurrentUser } from '@/lib/data/auth'
import { ENROLLMENTS_SLUG, BLUEPRINTS_SLUG, COURSES_SLUG } from '@/payload/collections/constants'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get search params
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')
    const productType = searchParams.get('product_type')

    if (!productId || !productType) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    if (productType !== 'blueprint' && productType !== 'course') {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 })
    }

    const payload = await getPayload()

    // Check if user has an active enrollment for this product
    // const { docs } = await payload.find({
    //   collection: ENROLLMENTS_SLUG,
    //   where: {
    //     and: [
    //       { user: { equals: user.id } },
    //       { type: { equals: productType } },
    //       { status: { equals: 'active' } },
    //     ],
    //   },
    //   depth: 1,
    //   limit: 50, // Allow for multiple enrollments
    // })

    // // Check if any enrollment matches the specific product
    // const hasAccess = docs.some((enrollment) => {
    //   if (productType === 'blueprint') {
    //     const blueprintValue = enrollment.enrolledBlueprint?.value
    //     return typeof blueprintValue === 'object'
    //       ? blueprintValue.id === parseInt(productId)
    //       : blueprintValue === parseInt(productId)
    //   } else {
    //     const courseValue = enrollment.enrolledCourse?.value
    //     return typeof courseValue === 'object'
    //       ? courseValue.id === parseInt(productId)
    //       : courseValue === parseInt(productId)
    //   }
    // })

    const hasAccess = true
    return NextResponse.json({ hasAccess })
  } catch (error) {
    console.error('Error checking user access:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
