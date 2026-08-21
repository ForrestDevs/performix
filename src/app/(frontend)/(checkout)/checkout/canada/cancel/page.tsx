import { getManualTaxCheckoutPlanSlugs } from '@/lib/stripe/manual-tax-checkout'
import Link from 'next/link'

type SearchParams = Promise<{
  plan?: string
  error?: string
}>

export default async function CanadaCheckoutCancelPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { plan, error } = await searchParams
  const canRetry = plan && getManualTaxCheckoutPlanSlugs().includes(plan)

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="mb-3 text-3xl font-semibold text-gray-950">Checkout Not Completed</h1>
        <p className="mb-6 text-gray-600">
          {error === 'setup'
            ? 'This checkout link is not configured yet. Please contact Performix.'
            : 'No payment was processed.'}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {canRetry && (
            <Link
              className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              href={`/checkout/canada/${plan}`}
            >
              Try Again
            </Link>
          )}
          <Link
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            href="/"
          >
            Return to Performix
          </Link>
        </div>
      </section>
    </main>
  )
}
