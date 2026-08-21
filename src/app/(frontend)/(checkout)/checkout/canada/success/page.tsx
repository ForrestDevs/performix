import { stripeClient } from '@/lib/stripe'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

type SearchParams = Promise<{
  session_id?: string
}>

function formatAmount(amount: number | null | undefined, currency: string | null | undefined) {
  if (amount == null || !currency) return null

  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

export default async function CanadaCheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { session_id } = await searchParams
  let amount: string | null = null
  let customerEmail: string | null | undefined = null

  if (session_id) {
    try {
      const session = await stripeClient.checkout.sessions.retrieve(session_id)
      amount = formatAmount(session.amount_total, session.currency)
      customerEmail = session.customer_details?.email
    } catch (error) {
      console.error('Error loading manual-tax checkout session:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle className="mx-auto mb-5 h-14 w-14 text-green-600" />
        <h1 className="mb-3 text-3xl font-semibold text-gray-950">Subscription Confirmed</h1>
        <p className="mb-6 text-gray-600">
          Your Performix subscription is active. A receipt has been sent by Stripe.
        </p>

        {(amount || customerEmail) && (
          <div className="mb-6 rounded-md bg-gray-50 p-4 text-left text-sm text-gray-700">
            {amount && (
              <div className="flex justify-between gap-4">
                <span>First charge</span>
                <span className="font-medium text-gray-950">{amount}</span>
              </div>
            )}
            {customerEmail && (
              <div className="mt-2 flex justify-between gap-4">
                <span>Email</span>
                <span className="font-medium text-gray-950">{customerEmail}</span>
              </div>
            )}
          </div>
        )}

        <Link className="text-sm font-medium text-blue-700 hover:text-blue-800" href="/">
          Return to Performix
        </Link>
      </section>
    </main>
  )
}
