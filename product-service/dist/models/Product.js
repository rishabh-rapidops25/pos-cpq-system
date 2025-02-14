"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: [true, "Product Name Required"],
        minlength: 3,
        maxlength: 100,
        match: /^[A-Za-z\s]+$/,
    },
    price: {
        type: Number,
        required: [true, "Price required"],
        min: 0,
    },
    category: {
        type: String,
        required: [true, "Category Required"],
        minlength: 3,
        maxlength: 50,
    },
    inStock: {
        type: Boolean,
        required: [true, "In-stock Required"],
    },
    description: {
        type: String,
        maxlength: 500,
    },
});
exports.Product = mongoose_1.default.model("Product", ProductSchema);
