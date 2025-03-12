import mongoose from 'mongoose';
import { IProduct } from '../interfaces/Product.interface';

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    productName: {
      type: String,
      required: [true, 'Product Name Required'],
      minlength: 3,
      maxlength: 100,
      match: /^[A-Za-z0-9\s]+$/,
    },
    price: {
      type: Number,
      required: [true, 'Price required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category Required'],
      minlength: 3,
      maxlength: 50,
    },
    inStock: {
      type: Boolean,
      required: [true, 'In-stock Required'],
    },
    description: {
      type: String,
      maxlength: 500,
    },
    imageURL: {
      type: String,
      required: [false, 'Image URL is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: '__v',
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
