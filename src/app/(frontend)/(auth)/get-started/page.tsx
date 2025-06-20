'use client'

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Users, Trophy, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogoClear } from '@/components/logo'
import { authClient } from '@/lib/auth/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignUpData = z.infer<typeof signUpSchema>

export default function GetStartedPage() {
  const visibleElements = useScrollAnimation()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const isVisible = (id: string) => visibleElements.has(id)

  const handleGoogleSignUp = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: '/student',
        })
      } catch (error) {
        toast.error('Failed to sign up with Google. Please try again.')
      }
    })
  }

  const onSubmit = (data: SignUpData) => {
    startTransition(async () => {
      try {
        const { error } = await authClient.signUp.email({
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: '/student', // Redirect to dashboard after email verification
        })

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Account created! Please check your email to verify your account.')
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`)
        }
      } catch (error: any) {
        console.error('Email sign up error:', error)
        toast.error(error.message || 'Failed to create account. Please try again.')
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <PerformixLogoClear />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-[#0891B2] via-[#0891B2] to-[#0E7490] py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 right-1/4 w-20 h-20 border border-white/10 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-1/3 left-1/4 w-36 h-36 border border-white/10 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-['Space_Grotesk']">
                Start Your{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">
                    Journey to Excellence
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto font-light">
                Join hundreds of players who&apos;ve transformed their hockey careers with elite
                mentorship. Create your account to get started!
              </p>

              <div className="flex items-center justify-center space-x-8 pt-4 opacity-80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                  <span className="text-sm font-medium">D1 Mentors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-400"></div>
                  <span className="text-sm font-medium">Elite Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card
              id="signup-form"
              data-scroll-animate
              className={`border-0 shadow-2xl transition-all duration-1000 ${
                isVisible('signup-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                  <p className="text-gray-600">
                    You&apos;ll complete your hockey profile after signing up
                  </p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="name">Full Name</FormLabel>
                            <FormControl>
                              <Input id="name" placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                id="password"
                                placeholder="******"
                                autoComplete="new-password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            <FormControl>
                              <PasswordInput
                                id="confirmPassword"
                                placeholder="******"
                                autoComplete="new-password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-12 text-lg"
                      >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* Email Signup Form */}

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-6 h-12 text-lg cursor-pointer"
                    onClick={handleGoogleSignUp}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    )}
                    Google
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 mb-4">
                    By creating an account, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/sign-in" className="underline">
                    Sign In
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="trust-indicators"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible('trust-indicators')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Email Verification Required</h3>
                <p className="text-gray-600 text-sm">
                  Secure account setup with email verification
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Complete Profile Later</h3>
                <p className="text-gray-600 text-sm">
                  Set up your hockey profile on your dashboard
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Proven Results</h3>
                <p className="text-gray-600 text-sm">100% improvement rate in first month</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
