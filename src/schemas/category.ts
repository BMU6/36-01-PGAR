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

/**
 * @openapi
 * components:
 *   schemas:
 *     CategoryInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Groceries"
 *     CategoryOutput:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: "Groceries"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ErrorMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     ErrorError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */
