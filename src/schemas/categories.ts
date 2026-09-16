import { z } from 'zod'

export const categoryInputSchema = z.strictObject({
  name: z
    .string()
    .min(2, { error: 'Category name must be at least 2 characters long.' })
})
