'use client'

import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Lock, Check, Download, Eye, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utilities/ui'
import { useRouter } from 'next/navigation'
import { enrollBlueprint } from '@/lib/data/blueprints'
import { toast } from 'sonner'

interface PurchaseButtonProps {
  price: number
  isPaid: boolean
  isAuthenticated: boolean
  isEnrolled: boolean
  blueprintId: string
  userId: number | undefined
}

export default function PurchaseButton({
  price,
  isPaid,
  isAuthenticated,
  isEnrolled,
  blueprintId,
  userId,
}: PurchaseButtonProps) {
  const router = useRouter()

  const handleEnroll = async () => {
    if (userId) {
      await enrollBlueprint(Number(blueprintId), userId)
      toast.success('Blueprint enrolled successfully')
      router.refresh()
    } else {
      router.push('/get-started')
    }
  }

  // Free blueprint
  if (!isEnrolled && !isPaid && price <= 0) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <div className="text-center">
          <Badge className="bg-green-100 text-green-800 mb-4">Free Blueprint</Badge>
          <h3 className="text-lg font-semibold text-green-900 mb-2">Access Instantly</h3>
          <p className="text-green-700 text-sm mb-4">
            This blueprint is available for free. Start using it right away!
          </p>
          {isAuthenticated ? (
            <Button
              onClick={handleEnroll}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Enroll
            </Button>
          ) : (
            <Link
              href="/get-started"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'w-full bg-green-600 hover:bg-green-700 text-white',
              )}
            >
              <User className="w-4 h-4 mr-2" />
              Get Started to Enroll
            </Link>
          )}
        </div>
      </div>
    )
  }

  // User already has access
  if (isEnrolled) {
    return (
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <Check className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">You Own This Blueprint</h3>
          <p className="text-blue-700 text-sm mb-4">
            You have full access to all content and downloads.
          </p>
        </div>
      </div>
    )
  }

  // Paid blueprint - purchase required
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-purple-200 p-6">
      <div className="text-center">
        <Badge className="bg-purple-100 text-purple-800 mb-4">Premium Blueprint</Badge>

        {/* Price Display */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</div>
          <div className="text-sm text-gray-600">One-time purchase</div>
        </div>

        {/* Features List */}
        <div className="mb-6 text-left">
          <h4 className="font-semibold text-gray-900 mb-3">What&apos;s included:</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Complete blueprint content</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Lifetime access</span>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        {isAuthenticated ? (
          <Link
            href={`/checkout?t=blueprint&pid=${blueprintId}`}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full bg-purple-600 hover:bg-purple-700 text-white h-12 text-lg font-semibold',
            )}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Purchase Blueprint
          </Link>
        ) : (
          <div className="space-y-3">
            <Link href="/sign-in">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12">
                <Lock className="w-5 h-5 mr-2" />
                Sign In to Purchase
              </Button>
            </Link>
            <p className="text-xs text-gray-500">Already have an account? Sign in to continue</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>30-day guarantee</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>Secure payment</span>
          </div>
        </div>
      </div>
    </div>
  )
}
