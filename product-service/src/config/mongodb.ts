import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "shared-constants";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/product-service";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    logger.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
