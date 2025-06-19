'use client'

import { Message } from '@/components/Message'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth/client'
import { cn } from '@/lib/utilities/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'
import React, { Fragment, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const recoverPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>

export function RecoverPasswordForm() {
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const form = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: RecoverPasswordData) => {
    startTransition(async () => {
      try {
        const res = await authClient.forgetPassword({
          email: data.email,
          redirectTo: '/reset-password',
        })

        if (res.error) {
          toast.error(res.error.message)
        } else {
          toast.success('Password reset email sent')
          setSuccess(true)
        }
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while sending the password reset email')
      }
    })
  }

  return (
    <Fragment>
      {!success && (
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Message className="mb-4" error={form.formState.errors.root?.message} />
              <Button
                type="submit"
                className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white"
                variant="default"
                disabled={isPending}
              >
                {isPending ? 'Sending...' : 'Send Recovery Email'}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                href="/sign-in"
                className={cn(buttonVariants({ variant: 'link' }), 'font-medium text-[#0891B2]')}
              >
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      )}

      {success && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
            <p className="text-gray-600">
              We&apos;ve sent a password recovery link to your email address. Click the link in the
              email to reset your password.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setSuccess(false)}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              try again
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}
