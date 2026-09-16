import { z } from "zod";
import { Types } from "mongoose";


export const userInputSchema = z.strictObject({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const userOutputSchema = userInputSchema.extend({
  _id: z.instanceof(Types.ObjectId),
  ...userInputSchema.shape,
  createdAt: z.date(),
});
