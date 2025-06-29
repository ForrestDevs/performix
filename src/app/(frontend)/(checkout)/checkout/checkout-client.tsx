'use client'

import React, { useMemo, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadStripe } from '@stripe/stripe-js'
import {
  CheckoutProvider,
  PaymentElement,
  AddressElement,
  useStripe,
  useCheckout,
} from '@stripe/react-stripe-js'
import { authClient } from '@/lib/auth/client'
import { ProductData } from '@/lib/types/checkout'
import Link from 'next/link'
import { ArrowLeft, Lock, CreditCard, Check, Loader2, Shield } from 'lucide-react'
import { Media as MediaComponent } from '@/components/Media'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface CheckoutPageClientProps {
  product: ProductData
  customerId: string
  userId: number | undefined
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export default function CheckoutPageClient({
  product,
  customerId,
  userId,
}: CheckoutPageClientProps) {
  const { data: session } = authClient.useSession()
  const user = session?.user
  const clientSecretCacheRef = useRef<Promise<string> | null>(null)

  const clientSecretPromise = useMemo(() => {
    // Return cached promise if it exists
    if (clientSecretCacheRef.current) {
      return clientSecretCacheRef.current
    }

    // Create new promise and cache it
    const promise = createCheckoutSession()
    clientSecretCacheRef.current = promise
    return promise

    async function createCheckoutSession(): Promise<string> {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customerId,
            mode: product.mode,
            stripeProductId: product.stripeProductId,
            stripePriceId: product.stripePriceId,
            productId: product.id,
            productType: product.type,
            userId: userId,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data.clientSecret
      } catch (error) {
        console.error('Error creating checkout session:', error)
        // Clear cache on error so we can retry
        clientSecretCacheRef.current = null
        throw error
      }
    }
  }, [
    customerId,
    product.id,
    product.mode,
    product.stripeProductId,
    product.stripePriceId,
    product.type,
    userId,
  ])

  const getProductLink = () => {
    if (product.type === 'blueprints') {
      return `/blueprints/${product.slug}`
    } else if (product.type === 'courses') {
      return `/courses/${product.slug}`
    } else if (product.type === 'plans') {
      return `/plans`
    }
    return '/'
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="mb-8">
          <Link
            href={getProductLink()}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {product.type}
          </Link>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-lg text-gray-600">Secure checkout powered by Stripe</p>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 mb-8 lg:mb-0">
            <div className="sticky top-8 space-y-6">
              <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {product.thumbnail && (
                      <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                        <MediaComponent
                          resource={product.thumbnail}
                          imgClassName="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          Premium Access
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card className="shadow-sm border-gray-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Secure & Protected</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" />
                          256-bit SSL encryption
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" />
                          PCI DSS compliant
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" />
                          30-day money-back guarantee
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">Payment Information</CardTitle>

                <div className="flex items-center space-x-3 pt-2">
                  <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <CheckoutProvider
                  stripe={stripePromise}
                  options={{
                    fetchClientSecret: () => clientSecretPromise,
                    elementsOptions: {
                      appearance: {
                        theme: 'stripe' as const,
                        variables: {
                          colorPrimary: '#3b82f6',
                          colorBackground: '#ffffff',
                          colorText: '#374151',
                          colorDanger: '#ef4444',
                          fontFamily: 'Inter, system-ui, sans-serif',
                          spacingUnit: '4px',
                          borderRadius: '8px',
                        },
                        rules: {
                          '.Input': {
                            border: '1px solid #e5e7eb',
                            boxShadow: 'none',
                          },
                          '.Input:focus': {
                            border: '1px solid #3b82f6',
                            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                          },
                        },
                      },
                      loader: 'always',
                    },
                  }}
                >
                  <CheckoutForm product={product} />
                </CheckoutProvider>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckoutForm({ product }: { product: ProductData }) {
  const stripe = useStripe()
  const checkout = useCheckout()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !checkout) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    const result = await checkout.confirm()

    if (result.type === 'error') {
      if (result.error.code === 'paymentFailed') {
        setMessage(result.error.paymentFailed.declineCode || 'An error occurred with your payment.')
      } else {
        setMessage(result.error.message || 'An unexpected error occurred.')
      }
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
        <AddressElement
          options={{
            mode: 'billing',
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {message && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{message}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || !checkout || isLoading}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold text-lg"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Complete Purchase • ${product.price}
          </>
        )}
      </Button>

      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        <p className="flex items-center justify-center space-x-2">
          <Lock className="w-4 h-4" />
          <span>Secured by Stripe</span>
        </p>
      </div>
    </form>
  )
}
