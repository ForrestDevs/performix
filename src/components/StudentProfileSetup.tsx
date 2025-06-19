'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  User,
  Phone,
  Calendar,
  Target,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight,
  Heart,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createStudentProfileAction, type StudentProfileData } from '@/lib/actions/student'
import { useBetterAuth } from '@/lib/auth/context'
import type { TypedUser } from 'payload'

const studentProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  birthDate: z.string().min(1, 'Birth date is required'),
  currentLevel: z.string().min(1, 'Current level is required'),
  position: z.enum(['forward', 'defence', 'goalie'], {
    required_error: 'Position is required',
  }),
  currentTeam: z.string().min(1, 'Current team is required'),
  goals: z.string().optional(),
  bio: z.string().optional(),
})

type StudentProfileFormData = z.infer<typeof studentProfileSchema>

interface StudentProfileSetupProps {
  isLoading?: boolean
}

export default function StudentProfileSetup({ isLoading = false }: StudentProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState<TypedUser | null>(null)
  const { currentUserPromise } = useBetterAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
    getValues,
  } = useForm<StudentProfileFormData>({
    resolver: zodResolver(studentProfileSchema),
    mode: 'onChange',
  })

  // Load current user and split name
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await currentUserPromise
        setCurrentUser(user)

        if (user?.name) {
          // Split the name into first and last name
          const nameParts = user.name.trim().split(' ')
          const firstName = nameParts[0] || ''
          const lastName = nameParts.slice(1).join(' ') || ''

          setValue('firstName', firstName)
          setValue('lastName', lastName)
        }
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }

    loadUser()
  }, [currentUserPromise, setValue])

  // Debug step changes
  useEffect(() => {
    console.log(`Step changed to: ${currentStep}`)
  }, [currentStep])

  const currentLevels = [
    'A',
    'AA',
    'AAA',
    'Junior A',
    'Junior B',
    'High School',
    'Prep School',
    'European',
    'Other',
  ]

  const positions = [
    { value: 'forward', label: 'Forward' },
    { value: 'defence', label: 'Defence' },
    { value: 'goalie', label: 'Goalie' },
  ]

  const validateStep = async (step: number) => {
    switch (step) {
      case 1:
        return await trigger(['firstName', 'lastName', 'phone', 'birthDate'])
      case 2:
        return await trigger(['currentLevel', 'position', 'currentTeam'])
      case 3:
        return await trigger(['goals', 'bio'])
      default:
        return false
    }
  }

  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 3) {
      console.log(`Moving from step ${currentStep} to step ${currentStep + 1}`)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalSubmit = async () => {
    // Get all form values
    const formData = getValues()

    // Validate the entire form
    const isValid = await trigger()
    if (!isValid) {
      toast.error('Please fix the errors in the form')
      return
    }

    if (!currentUser?.id) {
      toast.error('User session not found. Please sign in again.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await createStudentProfileAction(currentUser.id, formData)

      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('Profile created successfully!')
        // You can add navigation logic here
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Hockey Background', icon: Trophy },
    { number: 3, title: 'Goals & Bio', icon: Heart },
  ]

  const watchedFields = watch()

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
              Complete Your Hockey Profile
            </h2>
            <p className="text-gray-600">
              Help us match you with the perfect mentor by completing your profile
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-[#0891B2] text-white'
                      : 'bg-gray-200 text-gray-500'
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
                      currentStep > step.number ? 'bg-[#0891B2]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-600 mb-6">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
          </div>

          <div>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        {...register('firstName')}
                        className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                        placeholder="Enter your first name"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        {...register('lastName')}
                        className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                        placeholder="Enter your last name"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="tel"
                        {...register('phone')}
                        className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="date"
                        {...register('birthDate')}
                        className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                      />
                    </div>
                    {errors.birthDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Hockey Background */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Level *
                  </label>
                  <select
                    {...register('currentLevel')}
                    className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none h-12"
                  >
                    <option value="">Select your current level</option>
                    {currentLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.currentLevel && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentLevel.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <select
                    {...register('position')}
                    className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none h-12"
                  >
                    <option value="">Select your position</option>
                    {positions.map((position) => (
                      <option key={position.value} value={position.value}>
                        {position.label}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Team *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      {...register('currentTeam')}
                      className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                      placeholder="Enter your current team name"
                    />
                  </div>
                  {errors.currentTeam && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentTeam.message}</p>
                  )}
                </div>

                {/* Hockey Profile Preview */}
                <div className="bg-gray-50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Your Hockey Profile Preview</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current Level:</span>
                      <p className="font-medium">{watchedFields.currentLevel || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Position:</span>
                      <p className="font-medium">{watchedFields.position || 'Not selected'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Current Team:</span>
                      <p className="font-medium">{watchedFields.currentTeam || 'Not entered'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goals & Bio */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Goals & Aspirations
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Textarea
                      {...register('goals')}
                      className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg min-h-[100px]"
                      placeholder="What are your hockey goals and aspirations? (e.g., play Division 1, improve skating speed, develop leadership skills)"
                    />
                  </div>
                  {errors.goals && (
                    <p className="text-red-500 text-sm mt-1">{errors.goals.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Bio
                  </label>
                  <Textarea
                    {...register('bio')}
                    className="border-2 border-gray-200 focus:border-[#0891B2] rounded-lg min-h-[120px]"
                    placeholder="Tell us a bit about yourself, your hockey journey, and what you're passionate about..."
                  />
                  {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                </div>

                {/* Final Profile Preview */}
                <div className="bg-gray-50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Complete Profile Preview</h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">
                        {`${watchedFields.firstName || ''} ${watchedFields.lastName || ''}`.trim() ||
                          'Not entered'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Hockey Background:</span>
                      <p className="font-medium">
                        {`${watchedFields.position || ''} at ${watchedFields.currentLevel || ''} with ${watchedFields.currentTeam || ''}`
                          .replace(/^at\s+/, '')
                          .replace(/\s+with\s+$/, '') || 'Not completed'}
                      </p>
                    </div>
                    {watchedFields.goals && (
                      <div>
                        <span className="text-gray-600">Goals:</span>
                        <p className="font-medium line-clamp-2">{watchedFields.goals}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading || isSubmitting}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading || isSubmitting}
                  className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isLoading || isSubmitting}
                  className="bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] hover:from-[#0E7490] hover:to-[#7C3AED] text-white px-8"
                >
                  {isSubmitting ? 'Creating Profile...' : 'Complete Profile'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
