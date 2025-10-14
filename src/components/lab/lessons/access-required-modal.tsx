'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Lock, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AccessRequiredModal {
  isOpen: boolean
  onClose: () => void
  isPreview: boolean
}

export default function AccessRequiredModal({ isOpen, onClose, isPreview }: AccessRequiredModal) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-white shadow-2xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center mb-4"
            >
              <Lock className="h-8 w-8 text-white" />
            </motion.div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Unlock {isPreview ? 'FreePreview' : 'Premium'} Content
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              Sign in to access the full lesson and download all resources
            </p>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-6"
          >
            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                What you&apos;ll get access to:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-[#0891B2]" />
                  Full Lesson content and instructions
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-[#0891B2]" />
                  Downloadable files and resources
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-[#0891B2]" />
                  Video tutorials and guides
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-[#0891B2]" />
                  Access to our community
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/sign-in" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-[#0891B2] to-[#0E7490] hover:from-[#0E7490] hover:to-[#164E63] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  Sign In to Continue
                </Button>
              </Link>

              <Link href="/get-started" className="block">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:border-[#0891B2] hover:bg-blue-50 font-medium py-3 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="text-center text-xs text-gray-500 pt-2">
              <p>✓ Free to join • ✓ No credit card required</p>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
