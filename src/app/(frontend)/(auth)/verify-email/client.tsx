'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { PerformixLogo } from '@/components/logo'
import { authClient } from '@/lib/auth/client'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

interface VerifyEmailClientProps {
  email: string
}

export default function VerifyEmailClient({ email }: VerifyEmailClientProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  // Countdown timer for resend button
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [resendCooldown])

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('Email address not found. Please try signing up again.')
      return
    }

    try {
      setIsResending(true)
      // Call the auth client to resend verification email
      await authClient.sendVerificationEmail({
        email: email,
        callbackURL: '/consumer',
      })

      toast.success('Verification email sent! Check your inbox.')
      setResendCooldown(60) // 60 second cooldown
    } catch (error: any) {
      console.error('Resend verification error:', error)
      toast.error(error.message || 'Failed to resend verification email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <div className="max-w-md w-full mx-4">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#0891B2]" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
                Check Your Email
              </h1>

              <p className="text-gray-600 mb-6">
                We&apos;ve sent a verification link to{' '}
                {email ? (
                  <span className="font-medium text-gray-900">{email}</span>
                ) : (
                  'your email address'
                )}
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Next Steps:
                </h3>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Check your email inbox (and spam folder)</li>
                  <li>2. Click the verification link in the email</li>
                  <li>3. You&apos;ll be redirected to your dashboard</li>
                  <li>4. Complete your hockey profile to get started</li>
                </ol>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending || resendCooldown > 0}
                  variant="outline"
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Resend in {resendCooldown}s
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/get-started"
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign Up
                  </Link>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Having trouble? Check your spam folder or{' '}
                  <a href="mailto:mateo@performix.ca" className="text-[#0891B2] hover:underline">
                    contact support
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
