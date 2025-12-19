'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { ShoppingCart, Check, Lock, Shield } from 'lucide-react'
import Link from 'next/link'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  blueprintId: string
  blueprintTitle: string
  price: number
  isAuthenticated: boolean
}

export default function PurchaseModal({
  isOpen,
  onClose,
  blueprintId,
  blueprintTitle,
  price,
  isAuthenticated,
}: PurchaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-white shadow-2xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <Badge className="bg-purple-100 text-purple-800 text-sm px-3 py-1">
                Premium Blueprint
              </Badge>
            </motion.div>
            <DialogTitle className="text-2xl font-bold text-gray-900">{blueprintTitle}</DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-6"
          >
            {/* Price Display */}
            <div className="text-center py-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
              <div className="text-4xl font-bold text-gray-900">${price.toFixed(2)}</div>
              <div className="text-sm text-gray-600 mt-1">One-time purchase</div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">What&apos;s included:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Complete blueprint content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Downloadable files and resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Video tutorials and guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            {isAuthenticated ? (
              <Link href={`/checkout?t=blueprint&pid=${blueprintId}`} className="block">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Purchase Blueprint
                </Button>
              </Link>
            ) : (
              <div className="space-y-3">
                <Link href="/sign-in" className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 h-12 rounded-xl transition-all duration-300"
                    size="lg"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Sign In to Purchase
                  </Button>
                </Link>
                <p className="text-xs text-center text-gray-500">
                  Already have an account? Sign in to continue
                </p>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>30-day guarantee</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Secure payment</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
