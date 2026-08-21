import { createManualTaxSubscriptionCheckout } from '@/lib/stripe/manual-tax-checkout'
import { NextRequest, NextResponse } from 'next/server'

type Params = Promise<{
  plan: string
}>

function parseEmail(value: string | null) {
  if (!value) return undefined

  const normalized = value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return undefined
  }

  return normalized
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { plan } = await params
  const customerEmail = parseEmail(req.nextUrl.searchParams.get('email'))

  try {
    const session = await createManualTaxSubscriptionCheckout({
      planSlug: plan,
      customerEmail,
    })

    return NextResponse.redirect(session.url, 303)
  } catch (error) {
    console.error('Error creating manual-tax checkout session:', error)

    return NextResponse.redirect(
      new URL(`/checkout/canada/cancel?plan=${encodeURIComponent(plan)}&error=setup`, req.url),
      303,
    )
  }
}
