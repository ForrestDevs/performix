'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Receipt, Download, Calendar, DollarSign, CreditCard } from 'lucide-react'

// Mock data - replace with actual invoice data
interface Invoice {
  id: string
  number: string
  status: 'paid' | 'pending' | 'failed' | 'refunded'
  amount: number
  currency: string
  description: string
  date: Date
  dueDate: Date
  paymentMethod: string
  downloadUrl?: string
}

// This would typically come from props or a data fetch
const mockInvoices: Invoice[] = [
  {
    id: 'inv_123',
    number: 'INV-2024-001',
    status: 'paid',
    amount: 2999,
    currency: 'USD',
    description: 'Pro Plan - Monthly Subscription',
    date: new Date('2024-01-15'),
    dueDate: new Date('2024-01-15'),
    paymentMethod: 'card_1234',
    downloadUrl: '/invoices/inv_123.pdf',
  },
  {
    id: 'inv_124',
    number: 'INV-2024-002',
    status: 'paid',
    amount: 1999,
    currency: 'USD',
    description: 'Additional Storage - 100GB',
    date: new Date('2024-01-10'),
    dueDate: new Date('2024-01-10'),
    paymentMethod: 'card_1234',
    downloadUrl: '/invoices/inv_124.pdf',
  },
  {
    id: 'inv_125',
    number: 'INV-2023-025',
    status: 'paid',
    amount: 2999,
    currency: 'USD',
    description: 'Pro Plan - Monthly Subscription',
    date: new Date('2023-12-15'),
    dueDate: new Date('2023-12-15'),
    paymentMethod: 'card_1234',
    downloadUrl: '/invoices/inv_125.pdf',
  },
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
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function getStatusColor(status: Invoice['status']): string {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'refunded':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const handleDownload = (invoice: Invoice) => {
    if (invoice.downloadUrl) {
      // In a real app, this would trigger a download
      console.log(`Downloading invoice ${invoice.number}`)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>
              <div className="font-medium">{invoice.number}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{invoice.description}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(invoice.date)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1 font-medium">
                <DollarSign className="h-3 w-3" />
                <span>{formatCurrency(invoice.amount, invoice.currency)}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(invoice.status)} variant="secondary">
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              {invoice.downloadUrl && invoice.status === 'paid' && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(invoice)}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download Invoice</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Receipt className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Invoices Found</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You don&apos;t have any invoices yet. Your payment history and receipts will appear here
          once you make your first purchase.
        </p>
        {/* <Button>Browse Plans</Button> */}
      </CardContent>
    </Card>
  )
}

export default function InvoicesCard() {
  const hasInvoices = false

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Invoices & Payment History</h2>
        <p className="text-muted-foreground">
          View and download your past invoices and payment receipts.
        </p>
      </div>

      {hasInvoices ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5" />
              <span>Invoice History</span>
            </CardTitle>
            <CardDescription>All your past transactions and payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTable invoices={mockInvoices} />
          </CardContent>
        </Card>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
