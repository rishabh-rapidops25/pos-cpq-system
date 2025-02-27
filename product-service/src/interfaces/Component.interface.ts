import Document from "mongoose";

export interface IComponentGroup extends Document {
  id?: string;
  componentName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: Number;
}
