import mongoose, { Schema } from "mongoose";
import { IComponentGroup } from "../interfaces/Component.interface";

const ComponentGroupSchema = new Schema<IComponentGroup>(
  {
    componentName: {
      type: String,
      required: [true, "Component Name is Required"],
      unique: true,
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

export default mongoose.model<IComponentGroup>(
  "ComponentGroup",
  ComponentGroupSchema
);
