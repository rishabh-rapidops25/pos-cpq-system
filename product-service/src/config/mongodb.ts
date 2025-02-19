import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "shared-constants";
// import { PricingOption } from "../models/PricingOption";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/product-service-v2";

// const dummyData = [
//   {
//     type: "color",
//     name: "green",
//     price: 12,
//     description: "A vibrant green color",
//   },
//   { type: "color", name: "red", price: 10, description: "A bright red color" },
//   { type: "color", name: "blue", price: 8, description: "A cool blue color" },
//   {
//     type: "color",
//     name: "white",
//     price: 15,
//     description: "A clean white color",
//   },
//   {
//     type: "color",
//     name: "brown",
//     price: 18,
//     description: "A rustic brown color",
//   },
//   {
//     type: "color",
//     name: "grey",
//     price: 14,
//     description: "A neutral grey color",
//   },
//   {
//     type: "mount",
//     name: "inside",
//     price: 20,
//     description: "Inside mounting option",
//   },
//   {
//     type: "mount",
//     name: "outside",
//     price: 25,
//     description: "Outside mounting option",
//   },
//   {
//     type: "material",
//     name: "wood",
//     price: 30,
//     description: "High-quality wood material",
//   },
//   {
//     type: "material",
//     name: "aluminum",
//     price: 25,
//     description: "Durable aluminum material",
//   },
//   {
//     type: "material",
//     name: "cloth",
//     price: 15,
//     description: "Soft cloth material",
//   },
//   {
//     type: "material",
//     name: "plastic",
//     price: 10,
//     description: "Affordable plastic material",
//   },
//   {
//     type: "material",
//     name: "steel",
//     price: 35,
//     description: "Strong steel material",
//   },
// ];

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // await PricingOption.insertMany(dummyData);
    logger.info("✅ Database Connected Successfully....");
    logger.info(`===============================================`);
  } catch (error) {
    logger.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
