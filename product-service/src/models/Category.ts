import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category Name Required"],
      minlength: 3,
      maxlength: 100,
      match: /^[A-Za-z0-9\s]+$/,
    },
    Code: {
      type: Number,
      required: [true, "Code required"],
      min: 0,
    },

    description: {
      type: String,
      maxlength: 500,
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
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Category = mongoose.model("Category", CategorySchema);
