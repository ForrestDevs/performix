'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useMobileMenu } from './context'

export const MobileMenu: React.FC = () => {
  const { isOpen, setIsOpen } = useMobileMenu()

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
      <div className="container mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          onClick={() => {
            setIsOpen(false)
          }}
          href="/mentors"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Mentors
        </Link>
        <Link
          onClick={() => {
            setIsOpen(false)
          }}
          href="/resources"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Resources
        </Link>
        <Link
          onClick={() => {
            setIsOpen(false)
          }}
          href="/pricing"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Pricing
        </Link>
        {/* <Link
          onClick={() => {
            setIsOpen(false)
          }}
          href="/testimonials"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Success Stories
        </Link> */}
        <Link
          onClick={() => {
            setIsOpen(false)
          }}
          href="/sign-in"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Sign In
        </Link>
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="px-2">
          <Link
            onClick={() => {
              setIsOpen(false)
            }}
            href="/get-started"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export const MobileMenuButton = () => {
  const { isOpen, setIsOpen } = useMobileMenu()

  return (
    <Button
      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      aria-expanded="false"
      onClick={() => {
        console.log('Mobile menu button clicked')
        setIsOpen(!isOpen)
      }}
    >
      <span className="sr-only">Open menu</span>
      {/* Menu icon when closed */}
      <svg
        className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
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
      {/* X icon when open */}
      <svg
        className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
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
    </Button>
  )
}
