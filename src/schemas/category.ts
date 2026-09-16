import { z } from "zod";
import { Types } from "mongoose";

export const categoryInputSchema = z.strictObject({
  name: z.string().trim().min(1, { message: "Category name is required" }),
});


export const categoryOutputSchema = categoryInputSchema.extend({
  _id: z.instanceof(Types.ObjectId),
  ...categoryInputSchema.shape,
  createdAt: z.date(),
});