import mongoose from "mongoose";

// Custom validation for price to ensure it is positive
const positivePriceValidator = (value: number) => value > 0;

const PricingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["color", "mount", "material"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      validate: [positivePriceValidator, "Price must be greater than 0"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index for type and name to prevent duplicate entries of the same name in the same type
PricingSchema.index({ type: 1, name: 1 }, { unique: true });

export const PricingOption = mongoose.model("PricingOption", PricingSchema);
