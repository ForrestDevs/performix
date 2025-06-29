import { Main } from '@/components/main'
import { UserCard } from '@/components/layout/students/settings'
import BillingCard from '@/components/layout/students/settings/billing'
import InvoicesCard from '@/components/layout/students/settings/invoices'
import { getPayload } from '@/lib/utilities/getPayload'
import { headers as getHeaders } from 'next/headers'

export default async function DashboardPage() {
  const payload = await getPayload()
  const headers = await getHeaders()

  const res = await payload.auth({
    headers: headers,
  })

  return (
    <Main className="w-full bg-background min-h-[80vh]">
      <div className="container mx-auto flex max-w-screen-lg flex-col gap-6">
        <UserCard />
        <BillingCard customerId={res?.user?.stripeCustomerId || ''} />
        {/* <InvoicesCard /> */}
      </div>
    </Main>
  )
}
