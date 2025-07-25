'use client'

import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { authClient } from '@/lib/auth/client'
// import { ChevronDown, Config, User, Webcam } from '@mynaui/icons-react'

interface UserMenuProps {
  className?: string
  user: {
    id: number
    name: string
    email: string
    image?: string | null
  }
}

export function UserMenu({ user, className }: UserMenuProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await authClient.signOut()
        toast.success('Signed out successfully')
        router.refresh()
      } catch (error) {
        console.error('Sign out error:', error)
        toast.error('Failed to sign out')
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-10 px-3">
          <Avatar>
            <AvatarImage src={user.image || ''} />
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user.name || user.email}
          <ChevronDown className="-mr-1 ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/student')}>
          <User className="mr-2 size-4" />
          My Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/student/settings')}>
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} variant="destructive">
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// <div className={cn('relative', className)}>
// <Button
//   variant="ghost"
//   className="flex items-center space-x-2 h-10 px-3"
//   onClick={() => setIsOpen(!isOpen)}
// >
//   <div className="w-8 h-8 bg-[#0891B2] rounded-full flex items-center justify-center text-white text-sm font-medium">
//     {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
//   </div>
//   <span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
//   <ChevronDown className="h-4 w-4 text-gray-500" />
// </Button>

// {isOpen && (
//   <>
//     {/* Backdrop */}
//     <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

//     {/* Dropdown menu */}
//     <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//       <div className="p-4 border-b border-gray-100">
//         <p className="text-sm font-medium text-gray-900">{user.name || 'Student'}</p>
//         <p className="text-sm text-gray-500">{user.email}</p>
//       </div>

//       <div className="py-2">
//         <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
//           <User className="h-4 w-4 mr-3" />
//           Profile Settings
//         </button>
//         <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
//           <Settings className="h-4 w-4 mr-3" />
//           Account Settings
//         </button>
//       </div>

//       <div className="border-t border-gray-100 py-2">
//         <button
//           onClick={handleSignOut}
//           disabled={isPending}
//           className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
//         >
//           <LogOut className="h-4 w-4 mr-3" />
//           {isPending ? 'Signing out...' : 'Sign out'}
//         </button>
//       </div>
//     </div>
//   </>
// )}
// </div>
