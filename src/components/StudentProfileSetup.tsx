'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Phone,
  Calendar,
  Target,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface StudentProfileData {
  phone: string
  age: string
  currentLevel: string
  position: string
  currentTeam: string
  goalLevel: string
}

interface StudentProfileSetupProps {
  onProfileComplete: (data: StudentProfileData) => void
  isLoading?: boolean
}

export default function StudentProfileSetup({ onProfileComplete, isLoading = false }: StudentProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<StudentProfileData>({
    phone: '',
    age: '',
    currentLevel: '',
    position: '',
    currentTeam: '',
    goalLevel: '',
  })

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

  const handleInputChange = (field: keyof StudentProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.phone && formData.age
      case 2:
        return formData.currentLevel && formData.position && formData.currentTeam && formData.goalLevel
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep(2)) {
      onProfileComplete(formData)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Hockey Background', icon: Trophy },
  ]

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

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
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
                      className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
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
                      className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                      placeholder="Enter your age"
                    />
                  </div>
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
                  value={formData.currentLevel}
                  onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none h-12"
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
                  className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none h-12"
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
                    className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
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
                  className="w-full border-2 border-gray-200 focus:border-[#0891B2] rounded-lg px-3 py-3 focus:outline-none h-12"
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
                <h3 className="font-semibold text-gray-900 mb-4">Your Hockey Profile Preview</h3>
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

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isLoading}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Previous
            </Button>

            {currentStep < 2 ? (
              <Button
                onClick={nextStep}
                disabled={!validateStep(currentStep) || isLoading}
                className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!validateStep(2) || isLoading}
                className="bg-gradient-to-r from-[#0891B2] to-[#8B5CF6] hover:from-[#0E7490] hover:to-[#7C3AED] text-white px-8"
              >
                {isLoading ? 'Saving Profile...' : 'Complete Profile'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}