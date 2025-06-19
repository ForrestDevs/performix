'use client'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { startTransition, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { toast } from 'sonner'

const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const token = searchParams.get('token')

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: ResetPasswordData) => {
    startTransition(async () => {
      try {
        const res = await authClient.resetPassword({
          newPassword: data.password,
          token: token || '',
        })

        if (res.error) {
          toast.error(res.error.message)
        } else {
          toast.success('Password reset successfully')
          router.push('/sign-in')
        }
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while resetting your password')
      }
    })
  }

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    form.reset({ token: token || undefined })
  }, [form, token])

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="******"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Message className="" error={form.formState.errors.root?.message} />
          <Button
            type="submit"
            variant="default"
            disabled={isPending}
            className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-12 text-lg"
          >
            {isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
