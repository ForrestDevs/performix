'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { CreditCard, Calendar, DollarSign, Package } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { authClient } from '@/lib/auth/client'
import { useEffect, useState } from 'react'

// Mock data - replace with actual subscription data
interface Subscription {
  id: string
  plan: string
  status: 'active' | 'canceled' | 'past_due'
  amount: number
  currency: string
  interval: 'month' | 'year'
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

// This would typically come from props or a data fetch
const mockSubscriptions: Subscription[] = [
  // Uncomment to test with subscription data
  // {
  //   id: 'sub_123',
  //   plan: 'Pro Plan',
  //   status: 'active',
  //   amount: 2999,
  //   currency: 'USD',
  //   interval: 'month',
  //   currentPeriodEnd: new Date('2024-02-15'),
  //   cancelAtPeriodEnd: false,
  // }
]

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function getStatusColor(status: Subscription['status']): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 hover:bg-green-100'
    case 'canceled':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    case 'past_due':
      return 'bg-red-100 text-red-800 hover:bg-red-100'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
}

function SubscriptionCard({ subscription }: { subscription: Subscription }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base font-medium">{subscription.plan}</CardTitle>
        </div>
        <Badge variant="secondary" className={getStatusColor(subscription.status)}>
          {subscription.status.replace('_', ' ')}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>
              {formatCurrency(subscription.amount, subscription.currency)}/{subscription.interval}
            </span>
          </div>
          {subscription.cancelAtPeriodEnd && (
            <Badge variant="outline" className="text-xs">
              Cancels {formatDate(subscription.currentPeriodEnd)}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {subscription.cancelAtPeriodEnd
              ? `Active until ${formatDate(subscription.currentPeriodEnd)}`
              : `Renews on ${formatDate(subscription.currentPeriodEnd)}`}
          </span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Manage Subscription
          </Button>
          {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
            <Button variant="outline" size="sm" className="flex-1">
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <CreditCard className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Active Subscriptions</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You don&apos;t have any active subscriptions. Upgrade to unlock premium features and get
          the most out of your learning experience.
        </p>
        <Link
          href="/plans"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'bg-[#0891B2] hover:bg-[#0E7490] text-white',
          )}
        >
          Browse Plans
        </Link>
      </CardContent>
    </Card>
  )
}

export default function BillingCard({ customerId }: { customerId: string }) {
  const [link, setLink] = useState<string | null>(null)
  useEffect(() => {
    const fetchLink = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/students/manage-billing`,
        {
          method: 'POST',
          body: JSON.stringify({
            customerId: customerId,
          }),
        },
      )
      const data = await res.json()
      setLink(data.url)
    }

    fetchLink()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Billing & Subscriptions</h2>
        <p className="text-muted-foreground">
          Manage your subscription plans and billing information.
        </p>
      </div>

      {link && (
        <div className="space-y-4">
          <Link href={link} className={cn(buttonVariants({ variant: 'outline' }))}>
            Manage Billing
          </Link>
        </div>
      )}
    </div>
  )
}
