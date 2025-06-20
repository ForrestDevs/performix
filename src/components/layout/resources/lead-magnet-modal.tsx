'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Lock,
  Mail,
  Gift,
  Star,
  Check,
  Download,
  PlayCircle,
  FileText,
  Users,
  Trophy,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utilities/ui'

const leadMagnetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  position: z.enum(['player', 'parent', 'coach', 'other']),
  ageGroup: z.enum(['under-12', '12-15', '16-18', '18-plus', 'adult']).optional(),
  marketingConsent: z.boolean(),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
})

type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>

interface LeadMagnetModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (data: LeadMagnetFormData) => void
  title?: string
  description?: string
  resourceTitle?: string
  resourceType?: 'article' | 'blueprint' | 'course'
  benefits?: string[]
}

export default function LeadMagnetModal({
  isOpen,
  onClose,
  onSuccess,
  title = 'Unlock Premium Hockey Resources',
  description = 'Get instant access to our exclusive content designed to accelerate your hockey development',
  resourceTitle,
  resourceType,
  benefits = [
    'Access to 50+ premium training blueprints',
    'Exclusive video content from D1+ mentors',
    'Weekly training tips and strategies',
    'Priority access to new resources',
    'Community of serious hockey players',
  ],
}: LeadMagnetModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<LeadMagnetFormData>({
    resolver: zodResolver(leadMagnetSchema),
    defaultValues: {
      email: '',
      firstName: '',
      position: 'player',
      marketingConsent: true,
      terms: false,
    },
  })

  const getResourceIcon = (type?: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'blueprint':
        return <Download className="h-5 w-5 text-green-500" />
      case 'course':
        return <PlayCircle className="h-5 w-5 text-purple-500" />
      default:
        return <Gift className="h-5 w-5 text-[#0891B2]" />
    }
  }

  const onSubmit = async (data: LeadMagnetFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Here you would typically call your API to save the lead
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call the success handler
      onSuccess(data)

      // Close the modal
      onClose()
    } catch (error) {
      console.error('Error submitting lead magnet form:', error)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[95vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#0891B2] to-[#8B5CF6] rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>

          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">{description}</DialogDescription>
          </div>

          {/* Resource Preview */}
          {resourceTitle && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                {getResourceIcon(resourceType)}
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 text-sm">{resourceTitle}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Premium Content
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Benefits */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                What you&apos;ll get:
              </h4>
              <ul className="space-y-2">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-blue-800">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a...</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="player">Player</option>
                        <option value="parent">Parent</option>
                        <option value="coach">Coach</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ageGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select age group</option>
                        <option value="under-12">Under 12</option>
                        <option value="12-15">12-15 years</option>
                        <option value="16-18">16-18 years</option>
                        <option value="18-plus">18+ years</option>
                        <option value="adult">Adult</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to the{' '}
                        <a href="/terms" className="text-[#0891B2] hover:underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-[#0891B2] hover:underline">
                          Privacy Policy
                        </a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketingConsent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[#0891B2] data-[state=checked]:border-[#0891B2]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-600">
                        Send me training tips and exclusive content (you can unsubscribe anytime)
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white py-3 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Getting Your Access...
                </>
              ) : (
                <>
                  <Gift className="h-5 w-5 mr-2" />
                  Get Free Access Now
                </>
              )}
            </Button>

            {/* Trust Indicators */}
            <div className="text-center text-xs text-gray-500 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-3 w-3" />
                <span>Join 5,000+ hockey players already improving their game</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span>4.9/5 rating from our community</span>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
