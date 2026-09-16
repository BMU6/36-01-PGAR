import { z } from 'zod'

export const orderInputSchema = z.strictObject({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, { error: 'Invalid user id.' }),
  products: z
    .array(
      z.strictObject({
        productId: z
          .string()
          .regex(/^[0-9a-fA-F]{24}$/, { error: 'Invalid product id.' }),
        quantity: z
          .number()
          .min(1, { error: 'Quantity must be at least 1.' })
          .default(1)
      })
    )
    .min(1, { error: 'Order must contain at least one product.' }),
  total: z
    .number({ error: 'Total is required' })
    .min(0, { error: 'Total must be zero or greater.' })
})
