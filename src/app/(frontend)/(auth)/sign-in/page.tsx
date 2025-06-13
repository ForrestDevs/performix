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
                  <p className="text-gray-600">Continue your journey to excellence</p>
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
