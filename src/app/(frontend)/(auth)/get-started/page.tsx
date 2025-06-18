'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Target,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'
import { signUpAction } from '@/lib/actions/auth'
import { createStudentProfileAction, type StudentProfileData } from '@/lib/actions/student'
import { toast } from 'sonner'

// Form schemas for each step
const accountSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    age: z.number().min(13, 'Must be at least 13 years old').max(25, 'Must be 25 or younger'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const profileSchema = z.object({
  currentLevel: z.enum([
    'aaa-bantam',
    'aaa-midget',
    'junior-a',
    'junior-b',
    'ushl',
    'nahl',
    'bchl',
    'high-school-varsity',
    'prep-school',
    'other',
  ]),
  position: z.enum([
    'left-wing',
    'right-wing',
    'center',
    'left-defense',
    'right-defense',
    'goalie',
  ]),
  currentTeam: z.string().min(2, 'Team name must be at least 2 characters'),
  goalLevel: z.enum(['d1', 'd3', 'acha', 'junior', 'professional', 'not-sure']),
  goals: z.string().optional(),
  bio: z.string().optional(),
})

type AccountData = z.infer<typeof accountSchema>
type ProfileData = z.infer<typeof profileSchema>

export default function GetStartedPage() {
  const visibleElements = useScrollAnimation()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [userId, setUserId] = useState<number | null>(null)
  const [emailVerified, setEmailVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if we're coming back from email verification
  const verifiedParam = searchParams?.get('verified')
  const tokenParam = searchParams?.get('token')

  const accountForm = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 18,
      password: '',
      confirmPassword: '',
    },
  })

  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      currentLevel: 'high-school-varsity',
      position: 'center',
      currentTeam: '',
      goalLevel: 'd1',
      goals: '',
      bio: '',
    },
  })

  const isVisible = (id: string) => visibleElements.has(id)

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Email Verification', icon: Mail },
    { number: 3, title: 'Hockey Profile', icon: Trophy },
  ]

  const currentLevelOptions = [
    { label: 'AAA Bantam', value: 'aaa-bantam' as const },
    { label: 'AAA Midget', value: 'aaa-midget' as const },
    { label: 'Junior A', value: 'junior-a' as const },
    { label: 'Junior B', value: 'junior-b' as const },
    { label: 'USHL', value: 'ushl' as const },
    { label: 'NAHL', value: 'nahl' as const },
    { label: 'BCHL', value: 'bchl' as const },
    { label: 'High School Varsity', value: 'high-school-varsity' as const },
    { label: 'Prep School', value: 'prep-school' as const },
    { label: 'Other', value: 'other' as const },
  ]

  const positionOptions = [
    { label: 'Left Wing', value: 'left-wing' as const },
    { label: 'Right Wing', value: 'right-wing' as const },
    { label: 'Center', value: 'center' as const },
    { label: 'Left Defense', value: 'left-defense' as const },
    { label: 'Right Defense', value: 'right-defense' as const },
    { label: 'Goalie', value: 'goalie' as const },
  ]

  const goalLevelOptions = [
    { label: 'Division 1 (D1)', value: 'd1' as const },
    { label: 'Division 3 (D3)', value: 'd3' as const },
    { label: 'ACHA', value: 'acha' as const },
    { label: 'Junior Hockey', value: 'junior' as const },
    { label: 'Professional', value: 'professional' as const },
    { label: 'Not Sure Yet', value: 'not-sure' as const },
  ]

  const onAccountSubmit = (data: AccountData) => {
    startTransition(async () => {
      try {
        const result = await signUpAction(data.firstName, data.lastName, data.email, data.password)

        if (result.error) {
          accountForm.setError('root', { message: result.error })
          toast.error(result.error)
        } else {
          toast.success(result.message || 'Account created successfully!')
          setUserId(result.user ?? null)
          setCurrentStep(2)
        }
      } catch (error) {
        console.error('Sign up error:', error)
        accountForm.setError('root', { message: 'An unexpected error occurred' })
        toast.error('An unexpected error occurred')
      }
    })
  }

  const onProfileSubmit = (data: ProfileData) => {
    startTransition(async () => {
      try {
        const accountData = accountForm.getValues()
        const profileData: StudentProfileData = {
          name: `${accountData.firstName} ${accountData.lastName}`,
          email: accountData.email,
          phone: accountData.phone,
          age: accountData.age,
          ...data,
        }

        const result = await createStudentProfileAction(userId ?? null, profileData)

        if (result.error) {
          profileForm.setError('root', { message: result.error })
          toast.error(result.error)
        } else {
          toast.success('Profile created successfully!')
          router.push('/consumer')
        }
      } catch (error) {
        console.error('Profile creation error:', error)
        profileForm.setError('root', { message: 'An unexpected error occurred' })
        toast.error('An unexpected error occurred')
      }
    })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <PerformixLogo />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0891B2] to-[#0E7490] py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
              Start Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                D1 Journey
              </span>
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of players who&apos;ve transformed their hockey careers with elite
              mentorship
            </p>

            {/* Progress Indicator */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-white text-[#0891B2]'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step.number ? 'bg-white' : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-sm opacity-75">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card
              id="signup-form"
              data-scroll-animate
              className={`border-0 shadow-2xl transition-all duration-1000 ${
                isVisible('signup-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <CardContent className="p-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Personal Information
                      </h2>
                      <p className="text-gray-600">Let&apos;s start with the basics</p>
                    </div>

                    <form
                      onSubmit={accountForm.handleSubmit(onAccountSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="text"
                              {...accountForm.register('firstName')}
                              className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                              placeholder="Enter your first name"
                              disabled={isPending}
                            />
                          </div>
                          {accountForm.formState.errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {accountForm.formState.errors.firstName.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="text"
                              {...accountForm.register('lastName')}
                              className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                              placeholder="Enter your last name"
                              disabled={isPending}
                            />
                          </div>
                          {accountForm.formState.errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {accountForm.formState.errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="email"
                            {...accountForm.register('email')}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Enter your email address"
                            disabled={isPending}
                          />
                        </div>
                        {accountForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {accountForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="tel"
                              {...accountForm.register('phone')}
                              className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                              placeholder="(555) 123-4567"
                              disabled={isPending}
                            />
                          </div>
                          {accountForm.formState.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {accountForm.formState.errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Age *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="number"
                              min="13"
                              max="25"
                              {...accountForm.register('age', { valueAsNumber: true })}
                              className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                              placeholder="Enter your age"
                              disabled={isPending}
                            />
                          </div>
                          {accountForm.formState.errors.age && (
                            <p className="text-red-500 text-sm mt-1">
                              {accountForm.formState.errors.age.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...accountForm.register('password')}
                            className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Create a secure password"
                            disabled={isPending}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            disabled={isPending}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {accountForm.formState.errors.password && (
                          <p className="text-red-500 text-sm mt-1">
                            {accountForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="password"
                            {...accountForm.register('confirmPassword')}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Confirm your password"
                            disabled={isPending}
                          />
                        </div>
                        {accountForm.formState.errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {accountForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      {accountForm.formState.errors.root && (
                        <div className="text-red-500 text-sm text-center">
                          {accountForm.formState.errors.root.message}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-12"
                      >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                        {!isPending && <ArrowRight className="h-5 w-5 ml-2" />}
                      </Button>
                    </form>
                  </div>
                )}

                {/* Step 2: Email Verification */}
                {currentStep === 2 && (
                  <div className="space-y-6 text-center">
                    <div className="mb-8">
                      <div className="w-16 h-16 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-[#0891B2]" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                      <p className="text-gray-600">
                        We&apos;ve sent a verification link to{' '}
                        <span className="font-semibold">{accountForm.getValues('email')}</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Click the verification link in your email to continue setting up your
                        profile.
                      </p>
                      <p className="text-sm text-gray-500">
                        Once verified, you&apos;ll be automatically redirected to complete your
                        hockey profile.
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex items-center"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
                      >
                        Skip for Demo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Hockey Profile */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Hockey Profile</h2>
                      <p className="text-gray-600">
                        Tell us about your hockey background and goals
                      </p>
                    </div>

                    <form
                      onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Level *
                        </label>
                        <select
                          {...profileForm.register('currentLevel')}
                          className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none"
                          disabled={isPending}
                        >
                          {currentLevelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {profileForm.formState.errors.currentLevel && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileForm.formState.errors.currentLevel.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position *
                        </label>
                        <select
                          {...profileForm.register('position')}
                          className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none"
                          disabled={isPending}
                        >
                          {positionOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {profileForm.formState.errors.position && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileForm.formState.errors.position.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Team *
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            {...profileForm.register('currentTeam')}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Enter your current team name"
                            disabled={isPending}
                          />
                        </div>
                        {profileForm.formState.errors.currentTeam && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileForm.formState.errors.currentTeam.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Goal Level *
                        </label>
                        <select
                          {...profileForm.register('goalLevel')}
                          className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none"
                          disabled={isPending}
                        >
                          {goalLevelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {profileForm.formState.errors.goalLevel && (
                          <p className="text-red-500 text-sm mt-1">
                            {profileForm.formState.errors.goalLevel.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Goals & Aspirations
                        </label>
                        <textarea
                          {...profileForm.register('goals')}
                          className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none resize-none"
                          rows={4}
                          placeholder="Tell us about your hockey goals and what you hope to achieve..."
                          disabled={isPending}
                        />
                      </div>

                      {profileForm.formState.errors.root && (
                        <div className="text-red-500 text-sm text-center">
                          {profileForm.formState.errors.root.message}
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          disabled={isPending}
                          className="flex items-center"
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isPending}
                          className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
                        >
                          {isPending ? 'Creating Profile...' : 'Complete Setup'}
                          {!isPending && <ArrowRight className="h-4 w-4 ml-2" />}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
