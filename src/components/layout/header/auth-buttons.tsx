'use client'

import { UserMenu } from '../UserMenu'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utilities/ui'
import { use } from 'react'
import { useBetterAuth } from '@/lib/auth/context'
import { authClient } from '@/lib/auth/client'

export function AuthButtons() {
  const { data, isPending } = authClient.useSession()

  if (!data?.user || isPending) {
    return (
      <div className="flex items-center gap-2">
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
      </div>
    )
  }

  return (
    <UserMenu
      className="pl-6"
      user={{
        id: Number(data.user.id),
        name: data.user.name,
        email: data.user.email,
        image: data.user.image,
      }}
    />
  )
}
