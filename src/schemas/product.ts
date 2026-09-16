import { z } from 'zod'
import { Types } from 'mongoose'

export const productInputSchema = z.strictObject({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  price: z.number().gt(0, { message: 'Price should be greater than zero.' }),
  category: z
    .string()
    .trim()
    .min(1, { message: 'Category ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, { error: 'Invalid category id.' })
})

export const productOutputSchema = productInputSchema.extend({
  _id: z.instanceof(Types.ObjectId),
  ...productInputSchema.shape,
  createdAt: z.date()
})
