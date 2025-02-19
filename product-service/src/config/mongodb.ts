import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "shared-constants";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/product-service-v2";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("✅ Database Connected Successfully....");
    logger.info(`===============================================`);
  } catch (error) {
    logger.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
