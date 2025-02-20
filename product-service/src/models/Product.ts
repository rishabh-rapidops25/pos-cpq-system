import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name Required"],
      minlength: 3,
      maxlength: 100,
      match: /^[A-Za-z\s]+$/, // Regex to allow only letters and spaces
    },
    price: {
      type: Number,
      required: [true, "Price required"],
      min: 0,
    },
    finalPrice: {
      type: Number,
      required: [true, "Final Price required"], // Added finalPrice to track the final price after customization
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
    imageURL: {
      type: String,
      required: [false, "Image URL is required"], // Optional image URL
    },
    colors: {
      type: [String], // Array of color strings
      required: false,
    },
    mount: {
      type: [String], // Array of mount options (inside/outside, etc.)
      required: false,
    },
    materials: {
      type: [String], // Array of materials (wood, aluminum, cloth)
      required: false,
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
      default: null, // NULL when not deleted
    },
  },
  { timestamps: true }
);

// Index for optimizing queries on productName, category, and inStock (optional)
ProductSchema.index({ productName: 1, category: 1, inStock: 1 });

export const Product = mongoose.model("Product", ProductSchema);
