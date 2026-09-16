import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: {type:String},
    price: {type: Number},
    categoryId: {type: Schema.Types.ObjectId, ref: "Category"}
  },
  {
    timestamps: true
  }
)

const Product = model('Product', categorySchema)

export default Product
