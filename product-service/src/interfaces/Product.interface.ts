import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  productName: string;
  price: Number;
  category: String;
  inStock: Boolean;
  imageURL: String;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
