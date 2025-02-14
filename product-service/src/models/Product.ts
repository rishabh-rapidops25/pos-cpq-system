import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product Name Required"],
    minlength: 3,
    maxlength: 100,
    match: /^[A-Za-z\s]+$/,
  },
  price: {
    type: Number,
    required: [true, "Price required"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Category Required"],
    minlength: 3,
    maxlength: 50,
  },
  inStock: {
    type: Boolean,
    required: [true, "In-stock Required"],
  },
  description: {
    type: String,
    maxlength: 500,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
