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
exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = require("../models/Product");
const joi_1 = __importDefault(require("joi"));
// Validation Schema
const productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
// Create Product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = productSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details[0].message });
    try {
        const product = new Product_1.Product(req.body);
        yield product.save();
        res.json({ message: "Product Created", product });
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
        next();
    }
});
exports.createProduct = createProduct;
// Get All Products
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllProducts = getAllProducts;
