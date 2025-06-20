'use client'

import { UserMenu } from '../UserMenu'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utilities/ui'
import { User } from '@/lib/auth/types'
import { authClient } from '@/lib/auth/client'
import { use } from 'react'

export function AuthButtons() {
  const { data } = use(authClient.getSession())

  const user = data?.user || null
  if (!user) {
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

  return (
    <UserMenu
      className="pl-6"
      user={{
        id: Number(user.id),
        name: user.name,
        email: user.email,
        image: user.image,
      }}
    />
  )
}
