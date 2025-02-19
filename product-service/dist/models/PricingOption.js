"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingOption = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Custom validation for price to ensure it is positive
const positivePriceValidator = (value) => value > 0;
const PricingSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
// Create a compound index for type and name to prevent duplicate entries of the same name in the same type
PricingSchema.index({ type: 1, name: 1 }, { unique: true });
exports.PricingOption = mongoose_1.default.model("PricingOption", PricingSchema);
