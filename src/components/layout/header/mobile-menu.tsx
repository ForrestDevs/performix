'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useMobileMenu } from './context'
import { AuthButtons } from './auth-buttons'
import { type MouseEvent } from 'react'
import { User } from '@/lib/auth/types'

export const MobileMenu: React.FC = () => {
  const { isOpen, setIsOpen } = useMobileMenu()

  return (
    <div
      id="mobile-menu"
      className={`${isOpen ? 'block' : 'hidden'} lg:hidden border-t border-gray-100 bg-white shadow-lg`}
    >
      <div className="mx-auto px-4 py-6 space-y-1">
        {/* Navigation Links */}
        <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
          <Link
            onClick={() => setIsOpen(false)}
            href="/mentors"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#0891B2] hover:bg-gray-50 transition-all duration-200 active:bg-gray-100"
          >
            Mentors
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/resources"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#0891B2] hover:bg-gray-50 transition-all duration-200 active:bg-gray-100"
          >
            Resources
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/lab"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#0891B2] hover:bg-gray-50 transition-all duration-200 active:bg-gray-100"
          >
            The Lab
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/plans"
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#0891B2] hover:bg-gray-50 transition-all duration-200 active:bg-gray-100"
          >
            Plans
          </Link>
        </nav>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* Authentication Section */}
        <div className="space-y-3">
          <AuthButtons />
        </div>
      </div>
    </div>
  )
}

/**
 * MobileMenuButton toggles the mobile navigation menu.
 * Accessible, keyboard-friendly, and visually clear.
 */
export const MobileMenuButton = () => {
  const { isOpen, setIsOpen } = useMobileMenu()

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <Button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      onClick={handleToggle}
      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
    >
      <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      {/* Hamburger icon */}
      {!isOpen && (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
      {/* Close (X) icon */}
      {isOpen && (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </Button>
  )
}
