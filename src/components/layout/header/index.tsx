import React from 'react'
import { PerformixLogo, PerformixLogoClear } from '@/components/logo'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import Breadcrumb from './breadcrumb'
import { cn } from '@/lib/utilities/ui'
import { MobileMenu, MobileMenuButton } from './mobile-menu'
import { MobileMenuProvider } from './context'

export default function Header() {
  return (
    <MobileMenuProvider>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <PerformixLogoClear />
              </Link>
              <Breadcrumb />
            </div>
            <div className="-mr-2 -my-2 lg:hidden">
              <MobileMenuButton />
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/mentors"
                className="text-gray-600 hover:text-[#0891B2] transition-colors"
              >
                Mentors
              </Link>
              <Link
                href="/resources"
                className="text-gray-600 hover:text-[#0891B2] transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-[#0891B2] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/testimonials"
                className="text-gray-600 hover:text-[#0891B2] transition-colors"
              >
                Success Stories
              </Link>
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white',
                )}
              >
                Sign In
              </Link>
              <Link
                href="/get-started"
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'bg-[#0891B2] hover:bg-[#0E7490] text-white',
                )}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
        <MobileMenu />
      </header>
    </MobileMenuProvider>
  )
}
