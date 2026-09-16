import { z } from 'zod'

export const userInputSchema = z.strictObject({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { error: 'Password must be at least 6 characters long.' }),
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
})
