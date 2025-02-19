"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const shared_constants_1 = require("shared-constants");
// import { PricingOption } from "../models/PricingOption";
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/product-service-v2";
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
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        // await PricingOption.insertMany(dummyData);
        shared_constants_1.logger.info("✅ Database Connected Successfully....");
        shared_constants_1.logger.info(`===============================================`);
    }
    catch (error) {
        shared_constants_1.logger.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
