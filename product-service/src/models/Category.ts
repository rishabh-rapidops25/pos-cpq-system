import mongoose from "mongoose";
import { ICategory } from "../interfaces/Category.interface";

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: [true, "Category Name Required"],
      minlength: 3,
      maxlength: 100,
      match: /^[A-Za-z0-9\s]+$/,
      unique: true,
    },
    code: {
      type: Number,
      required: [true, "Code required"],
      unique: true,
      min: 0,
    },

    description: {
      type: String,
      maxlength: 500,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    updatedOn: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: [true, "Enum Required"],
    },
    isDeleted: {
      type: Number,
      default: 0,
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

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
