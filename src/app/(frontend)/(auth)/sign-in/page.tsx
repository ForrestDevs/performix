"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Users, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation"
import { PerformixLogo } from "@/components/logo"

export default function SignInPage() {
  const visibleElements = useScrollAnimation()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const isVisible = (id: string) => visibleElements.has(id)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign in attempt:", formData)
    // Handle sign in logic here
  }

  const recentSuccesses = [
    {
      name: "Alex Johnson",
      achievement: "Committed to Boston University",
      timeAgo: "2 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Chen",
      achievement: "First D1 Offer - Michigan",
      timeAgo: "1 week ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mike Rodriguez",
      achievement: "NHL Draft Pick",
      timeAgo: "2 weeks ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

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
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Sign In</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">New to Performix?</span>
              <Link href="/get-started">
                <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left Side - Sign In Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card
              id="signin-form"
              data-scroll-animate
              className={`border-0 shadow-2xl transition-all duration-1000 ${
                isVisible("signin-form") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">Welcome Back</h1>
                  <p className="text-gray-600">Continue your journey to D1 hockey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 border-2 border-gray-200 focus:border-[#0891B2] rounded-lg h-12"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                        className="h-4 w-4 text-[#0891B2] focus:ring-[#0891B2] border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-[#0891B2] hover:text-[#0E7490]">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-12 text-lg">
                    Sign In
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/get-started" className="text-[#0891B2] hover:text-[#0E7490] font-medium">
                      Get started for free
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Success Stories & Features */}
        <div className="bg-gradient-to-br from-[#0891B2] to-[#0E7490] p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 text-white max-w-lg mx-auto">
            <div
              id="signin-hero"
              data-scroll-animate
              className={`transition-all duration-1000 ${
                isVisible("signin-hero") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-['Space_Grotesk']">Your Journey Continues</h2>
              <p className="text-xl mb-8 opacity-90">
                Join the community that&apos;s helping hundreds of AAA players achieve their D1 dreams
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">450+</div>
                  <div className="text-sm opacity-75">Players Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">94%</div>
                  <div className="text-sm opacity-75">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">25+</div>
                  <div className="text-sm opacity-75">Partner Universities</div>
                </div>
              </div>

              {/* Recent Successes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Recent Successes</h3>
                {recentSuccesses.map((success, index) => (
                  <div
                    key={index}
                    className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-500 ${
                      isVisible("signin-hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 200 + 500}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full overflow-hidden">
                        <Image
                          src={success.avatar || "/placeholder.svg"}
                          alt={success.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{success.name}</h4>
                        <p className="text-sm opacity-75">{success.achievement}</p>
                      </div>
                      <div className="text-xs opacity-60">{success.timeAgo}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Verified D1+ mentors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Personalized training plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Recruiting guidance & support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">Parent dashboard & transparency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="trust-indicators"
            data-scroll-animate
            className={`transition-all duration-1000 ${
              isVisible("trust-indicators") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure Login</h3>
                <p className="text-gray-600 text-sm">Your account is protected with enterprise-grade security</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-[#0891B2]" />
                </div>
                <h3 className="font-semibold text-gray-900">Trusted Community</h3>
                <p className="text-gray-600 text-sm">Join 450+ players and their families</p>
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
