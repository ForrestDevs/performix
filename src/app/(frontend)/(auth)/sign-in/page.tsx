'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Users, Trophy, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogoClear } from '@/components/logo'
import { authClient } from '@/lib/auth/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

type SignInData = z.infer<typeof signInSchema>

export default function SignInPage() {
  const visibleElements = useScrollAnimation()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const isVisible = (id: string) => visibleElements.has(id)

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: 'google',
          callbackURL: '/student', // Redirect to dashboard
        })
      } catch (error) {
        console.error('Google sign in error:', error)
        toast.error('Failed to sign in with Google. Please try again.')
      }
    })
  }

  const onSubmit = (data: SignInData) => {
    startTransition(async () => {
      try {
        const { error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
          callbackURL: '/student', // Redirect to dashboard after successful login
        })

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Signed in successfully!')
          router.push('/student')
        }
      } catch (error: any) {
        console.error('Sign in error:', error)
        toast.error(error.message || 'An unexpected error occurred')
      }
    })
  }

  return (
    <div className="bg-background">

      
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card
            id="signin-form"
            data-scroll-animate
            className={`border-0 shadow-2xl transition-all duration-1000 ${
              isVisible('signin-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Continue your journey to excellence</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <FormControl>
                            <PasswordInput
                              id="password"
                              placeholder="******"
                              autoComplete="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              id="rememberMe"
                              checked={field.value || false}
                              onCheckedChange={(checked) => {
                                field.onChange(checked)
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="rememberMe"
                            className="text-sm font-normal cursor-pointer"
                          >
                            Remember me
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    {form.formState.errors.root && (
                      <div className="text-red-500 text-sm text-center">
                        {form.formState.errors.root.message}
                      </div>
                    )}

                    <div className="flex justify-start">
                      <Link
                        href="/recover-password"
                        className="text-sm text-[#0891B2] hover:text-[#0E7490] hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-12 text-lg"
                    >
                      {isPending ? 'Signing In...' : 'Sign In'}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 h-12 text-lg"
                  onClick={handleGoogleSignIn}
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
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/get-started"
                    className="text-[#0891B2] hover:text-[#0E7490] font-medium"
                  >
                    Get started for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="py-12 bg-background">
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
                <h3 className="font-semibold text-gray-900">Secure Login</h3>
                <p className="text-gray-600 text-sm">
                  Your account is protected with enterprise-grade security
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Multiple Login Options</h3>
                <p className="text-gray-600 text-sm">
                  Sign in with email or Google for convenience
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Proven Results</h3>
                <p className="text-gray-600 text-sm">94% success rate in D1 placements</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
