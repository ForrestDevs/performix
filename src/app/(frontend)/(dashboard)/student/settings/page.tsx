// import AccountSwitcher from '@/components/account-switch'

// import { OrganizationCard } from './organization-card'
import { Main } from '@/components/main'
import { UserCard } from '@/components/layout/students/settings'
import BillingCard from '@/components/layout/students/settings/billing'
import InvoicesCard from '@/components/layout/students/settings/invoices'

export default function DashboardPage() {
  return (
    <Main className="w-full">
      <div className="container mx-auto flex max-w-screen-lg flex-col gap-6">
        {/* <AccountSwitcher /> */}
        <UserCard />
        <BillingCard />
        <InvoicesCard />
        {/* <OrganizationCard /> */}
      </div>
    </Main>
  )
}
