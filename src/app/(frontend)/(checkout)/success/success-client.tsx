'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Download,
  BookOpen,
  ArrowRight,
  Loader2,
  AlertCircle,
  Home,
  Receipt,
} from 'lucide-react'
import { handleSuccessfulPayment } from '@/lib/actions/checkout'
import { User } from '@/payload-types'
import Link from 'next/link'
import { toast } from 'sonner'
import Stripe from 'stripe'

interface SuccessPageClientProps {
  sessionId: string
}
type ProcessedPayment =
  | {
      success: true
      session: Stripe.Response<Stripe.Checkout.Session>
      error?: string
    }
  | {
      success: false
      error: string
    }

export default function SuccessPageClient({ sessionId }: SuccessPageClientProps) {
  const [processing, setProcessing] = useState(true)
  const [payment, setPayment] = useState<ProcessedPayment | null>(null)

  // useEffect(() => {
  //   async function processPayment() {
  //     try {
  //       const result = await handleSuccessfulPayment(sessionId, transactionId)

  //       if (result.success) {
  //         // Fetch payment details
  //         const response = await fetch(
  //           `/api/checkout/payment-details?transaction_id=${transactionId}`,
  //           {
  //             credentials: 'include',
  //           },
  //         )

  //         if (response.ok) {
  //           const paymentData = await response.json()
  //           setPayment({ success: true, product: paymentData.product })
  //         } else {
  //           setPayment({ success: true })
  //         }
  //       } else {
  //         setPayment({ success: false, error: result.error || 'Payment processing failed' })
  //       }
  //     } catch (error) {
  //       console.error('Payment processing error:', error)
  //       setPayment({ success: false, error: 'Failed to process payment' })
  //     } finally {
  //       setProcessing(false)
  //     }
  //   }

  //   processPayment()
  // }, [sessionId, transactionId])

  useEffect(() => {
    const fetchPayment = async () => {
      const payment = await handleSuccessfulPayment(sessionId)
      setPayment(payment as ProcessedPayment)
      setProcessing(false)
    }
    fetchPayment()
  }, [sessionId])

  if (processing) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Payment</h1>
          <p className="text-gray-600">Please wait while we confirm your purchase...</p>
        </div>
      </div>
    )
  }

  // if (!payment?.success) {
  //   return (
  //     <div className="max-w-2xl mx-auto text-center py-12">
  //       <div className="bg-red-50 border border-red-200 rounded-lg p-8">
  //         <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
  //         <h1 className="text-2xl font-bold text-red-900 mb-2">Payment Processing Error</h1>
  //         <p className="text-red-700 mb-6">
  //           {payment?.error ||
  //             'There was an issue processing your payment. Please contact support.'}
  //         </p>
  //         <div className="flex space-x-4 justify-center">
  //           <Link href="/">
  //             <Button variant="outline">
  //               <Home className="w-4 h-4 mr-2" />
  //               Go Home
  //             </Button>
  //           </Link>
  //           <Link href="/contact">
  //             <Button>Contact Support</Button>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 text-lg">
          Thank you for your purchase. You now have access to your content.
        </p>
      </div>

      {payment?.success && payment.session && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Your purchase has been confirmed.</p>
          {/* <pre>{JSON.stringify(payment.session, null, 2)}</pre> */}
        </div>
      )}

      {/* Order Details */}
      {/* {payment?.product && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {payment.product.thumbnail && (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={payment.product.thumbnail.url}
                    alt={payment.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{payment.product.title}</h3>
                <Badge className="bg-green-100 text-green-800 mb-2">
                  Premium {payment.product.type}
                </Badge>
                <p className="text-lg font-bold text-gray-900">
                  ${payment.product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What&apos;s Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Access Your Content</p>
                <p className="text-sm text-gray-600">
                  You can now view and download all premium content
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Save to Your Account</p>
                <p className="text-sm text-gray-600">
                  Content is automatically saved to your profile
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Get Email Receipt</p>
                <p className="text-sm text-gray-600">Check your email for a detailed receipt</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Link href="/student" className="flex-1">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Home className="w-4 h-4 mr-2" />
            View My Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Support Notice */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Questions about your purchase?{' '}
          <Link href="/contact" className="text-blue-600 hover:text-blue-700">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
