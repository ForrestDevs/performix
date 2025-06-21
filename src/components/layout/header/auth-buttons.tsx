'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utilities/ui'
import { Session } from '@/lib/auth/types'
import { UserMenu } from '../UserMenu'

interface AuthButtonsProps {
  user: Session['user'] | null
}

export function AuthButtons({ user }: AuthButtonsProps) {
  // return (
  //   <div className="flex items-center gap-2">
  //     <Link
  //       href="/sign-in"
  //       className={cn(
  //         buttonVariants({ variant: 'outline' }),
  //         'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white',
  //       )}
  //     >
  //       Sign In
  //     </Link>
  //     <Link
  //       href="/get-started"
  //       className={cn(
  //         buttonVariants({ variant: 'default' }),
  //         'bg-[#0891B2] hover:bg-[#0E7490] text-white',
  //       )}
  //     >
  //       Get Started
  //     </Link>
  //   </div>
  // )
  if (!user) {
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
        id: Number(user.id),
        name: user.name,
        email: user.email,
        image: user.image,
      }}
    />
  )
}
