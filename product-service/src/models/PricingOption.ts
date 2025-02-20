import mongoose from "mongoose";

// Custom validation for price to ensure it is positive
const positivePriceValidator = (value: number) => value > 0;

const PricingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["color", "mount", "material"], // Restrict to these 3 types
    },
    name: {
      type: String,
      required: true,
      trim: true, // Ensure that the name is trimmed
    },
    price: {
      type: Number,
      required: true,
      validate: [positivePriceValidator, "Price must be greater than 0"], // Ensure price is positive
    },
    description: {
      type: String,
      default: "",
      trim: true, // Trim whitespace around description
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true, // Ensure that a product is always associated with a pricing option
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a compound index for type and name to prevent duplicate entries of the same name in the same type
PricingSchema.index({ type: 1, name: 1, product: 1 }, { unique: true });

export const PricingOption = mongoose.model("PricingOption", PricingSchema);
