import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  id?: string;
  categoryName?: string;
  code?: Number;
  createdOn?: Date;
  updatedOn?: Date;
  status?: "Active" | "Inactive";
  description?: string;
  isDeleted?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface CategoryFilter {
  categoryName?: string | { $regex: RegExp };
  status?: "Active" | "Inactive";
  code?: number;
}
