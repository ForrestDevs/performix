import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8, { message: 'Password must be at least 8 characters' }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  type: z.enum(['consumer', 'producer']),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().email(),
  password: z.string().trim().min(8, { message: 'Password must be at least 8 characters' }),
  passwordConfirm: z.string().trim().min(8, { message: 'Password must be at least 8 characters' }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
