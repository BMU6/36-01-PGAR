import { z } from "zod";
import { Types } from "mongoose";


export const orderInputSchema = z.strictObject({
  userId: z.string().trim().min(1, { message: "User ID is required" }),

  products: z
    .array(
      z.strictObject({
        productId: z.string().trim().min(1, { message: "User ID is required" }),

        quantity: z
          .number()
          .gt(0, { message: "Quantity must be at least 1" })
          .default(1),
      }),
    )
    .min(1, { message: "An order must contain at least one product" }),

  total: z.number(),
});

export const orderOutputSchema = orderInputSchema.extend({
  _id: z.instanceof(Types.ObjectId),
  ...orderInputSchema.shape,
  createdAt: z.date(),
});
