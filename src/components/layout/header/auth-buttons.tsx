'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utilities/ui'
import { UserMenu } from '../UserMenu'
import { authClient } from '@/lib/auth/client'

export function AuthButtons() {
  const { data: session, isPending } = authClient.useSession()

  if (!session?.user || isPending) {
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
        id: Number(session.user.id),
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    />
  )
}
