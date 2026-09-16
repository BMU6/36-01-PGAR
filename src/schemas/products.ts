import { z } from 'zod'

export const productInputSchema = z.strictObject({
  name: z
    .string()
    .min(2, { error: 'Product name must be at least 2 characters long.' }),
  description: z
    .string()
    .min(8, { error: 'Product description must be at least 8 characters long.' }),
  price: z.number().min(0, { error: 'Price must be zero or greater.' }),
  // original regex mongodb uses to check a id if it is syntactely valid or not
  category: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { error: 'Invalid category id.' })
})
