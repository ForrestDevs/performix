'use client'

import { useBetterAuth } from '@/lib/auth/context'
import { UserMenu } from '../UserMenu'
import { use } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utilities/ui'

export function AuthButtons() {
  const { currentUserPromise } = useBetterAuth()

  const user = use(currentUserPromise)

  if (user && user.role === 'admin') {
    return (
      <Link
        href="/admin"
        className={cn(
          buttonVariants({ variant: 'default' }),
          'bg-[#0891B2] hover:bg-[#0E7490] text-white',
        )}
      >
        Admin
      </Link>
    )
  }

  if (user && user.role === 'student') {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/consumer"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'bg-[#0891B2] hover:bg-[#0E7490] text-white',
          )}
        >
          Dashboard
        </Link>
        <UserMenu
          className="hidden lg:block"
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }}
        />
      </div>
    )
  }

  return (
    <>
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
    </>
  )
}
