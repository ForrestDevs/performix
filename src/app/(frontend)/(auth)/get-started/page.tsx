'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ChevronRight,
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
import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PerformixLogo } from '@/components/logo'

export default function GetStartedPage() {
  const visibleElements = useScrollAnimation()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: '',

    // Hockey Info
    currentLevel: '',
    position: '',
    currentTeam: '',
    goalLevel: '',

    // Mentor Pairing
    needsCall: true,
    hasHadCall: false,
  })

  const isVisible = (id: string) => visibleElements.has(id)

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Hockey Background', icon: Trophy },
    { number: 3, title: 'Goals & Mentorship', icon: Target },
  ]

  const currentLevels = [
    'AAA Bantam',
    'AAA Midget',
    'Junior A',
    'Junior B',
    'USHL',
    'NAHL',
    'BCHL',
    'High School Varsity',
    'Prep School',
    'Other',
  ]

  const positions = ['Left Wing', 'Right Wing', 'Center', 'Left Defense', 'Right Defense', 'Goalie']

  const goalLevels = [
    'Division 1 (D1)',
    'Division 3 (D3)',
    'ACHA',
    'Junior Hockey',
    'Professional',
    'Not Sure Yet',
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.age &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        )
      case 2:
        return (
          formData.currentLevel && formData.position && formData.currentTeam && formData.goalLevel
        )
      case 3:
        return true // Final step is always valid
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // Handle form submission here
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Enter your first name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Enter your last name"
                          />
                        </div>
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
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                          placeholder="Enter your email address"
                        />
                      </div>
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
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="(555) 123-4567"
                          />
                        </div>
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
                            max="22"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                            placeholder="Enter your age"
                          />
                        </div>
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
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                          placeholder="Create a secure password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                          placeholder="Confirm your password"
                        />
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                        )}
                    </div>
                  </div>
                )}

                {/* Step 2: Hockey Background */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Hockey Background</h2>
                      <p className="text-gray-600">Tell us about your current hockey experience</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Level *
                      </label>
                      <select
                        value={formData.currentLevel}
                        onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                        className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none"
                      >
                        <option value="">Select your current level</option>
                        {currentLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <select
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none"
                      >
                        <option value="">Select your position</option>
                        {positions.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Team *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="text"
                          value={formData.currentTeam}
                          onChange={(e) => handleInputChange('currentTeam', e.target.value)}
                          className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg"
                          placeholder="Enter your current team name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Goal Level *
                      </label>
                      <select
                        value={formData.goalLevel}
                        onChange={(e) => handleInputChange('goalLevel', e.target.value)}
                        className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none"
                      >
                        <option value="">Select your goal level</option>
                        {goalLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Hockey Stats Preview */}
                    <div className="bg-gray-50 rounded-lg p-6 mt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Your Hockey Profile Preview
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current Level:</span>
                          <p className="font-medium">{formData.currentLevel || 'Not selected'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Position:</span>
                          <p className="font-medium">{formData.position || 'Not selected'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Team:</span>
                          <p className="font-medium">{formData.currentTeam || 'Not entered'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Goal Level:</span>
                          <p className="font-medium">{formData.goalLevel || 'Not selected'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Goals & Mentorship */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Mentor Pairing</h2>
                      <p className="text-gray-600">
                        Let&apos;s get you matched with the perfect mentor
                      </p>
                    </div>

                    {/* Account Summary */}
                    <div className="bg-gradient-to-r from-[#0891B2]/10 to-[#8B5CF6]/10 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Account Summary</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <p className="font-medium">
                            {formData.firstName} {formData.lastName}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Age:</span>
                          <p className="font-medium">{formData.age} years old</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Position:</span>
                          <p className="font-medium">{formData.position}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Goal:</span>
                          <p className="font-medium">{formData.goalLevel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Mentor Pairing Options */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Next Steps</h3>

                      <div className="space-y-3">
                        <div
                          onClick={() => handleInputChange('needsCall', true)}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            formData.needsCall
                              ? 'border-[#0891B2] bg-[#0891B2]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mt-0.5 transition-all duration-200 ${
                                formData.needsCall
                                  ? 'border-[#0891B2] bg-[#0891B2]'
                                  : 'border-gray-300'
                              }`}
                            >
                              {formData.needsCall && (
                                <CheckCircle className="h-3 w-3 text-white m-0.5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                📞 Book a call with Mateo for mentor pairing
                              </h4>
                              <p className="text-sm text-gray-600">
                                Schedule a 15-minute call to discuss your goals and get matched with
                                the perfect mentor based on your position, playing style, and
                                aspirations.
                              </p>
                              <Badge className="mt-2 bg-[#0891B2] text-white">Recommended</Badge>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => handleInputChange('needsCall', false)}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                            !formData.needsCall
                              ? 'border-[#0891B2] bg-[#0891B2]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mt-0.5 transition-all duration-200 ${
                                !formData.needsCall
                                  ? 'border-[#0891B2] bg-[#0891B2]'
                                  : 'border-gray-300'
                              }`}
                            >
                              {!formData.needsCall && (
                                <CheckCircle className="h-3 w-3 text-white m-0.5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                ✅ I&apos;ve already had my call and I&apos;m ready to start
                              </h4>
                              <p className="text-sm text-gray-600">
                                Skip the pairing call and go directly to browsing mentors. You can
                                always schedule a call later if needed.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* What happens next */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                      <div className="space-y-3 text-sm">
                        {formData.needsCall ? (
                          <>
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                1
                              </div>
                              <span>You&apos;ll be redirected to book a call with Mateo</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                2
                              </div>
                              <span>
                                Discuss your goals and get personalized mentor recommendations
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                3
                              </div>
                              <span>Start your mentorship journey with your matched mentor</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                1
                              </div>
                              <span>Access your dashboard and browse available mentors</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                2
                              </div>
                              <span>Book sessions with mentors that match your goals</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                3
                              </div>
                              <span>Start your journey to D1 hockey</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      onClick={nextStep}
                      disabled={!validateStep(currentStep)}
                      className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
                    >
                      Next Step
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] hover:from-[#0E7490] hover:to-[#7C3AED] text-white px-8"
                    >
                      {formData.needsCall ? 'Create Account & Book Call' : 'Create Account & Start'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
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
                <div className="w-16 h-16 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-gray-600 text-sm">
                  Your information is encrypted and never shared without permission
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Verified Mentors</h3>
                <p className="text-gray-600 text-sm">
                  All mentors are background-checked D1+ players
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="h-8 w-8 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Proven Results</h3>
                <p className="text-gray-600 text-sm">
                  94% of our athletes receive D1 offers within 12 months
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
