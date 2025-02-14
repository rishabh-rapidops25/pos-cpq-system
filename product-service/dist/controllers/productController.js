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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = require("../models/Product");
// Create Product
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price, category, inStock, description } = req.body;
        const product = new Product_1.Product({
            productName,
            price,
            category,
            inStock,
            description
        });
        yield product.save();
        res.json({ message: "Product Created", product });
    }
    catch (err) {
        next(err);
    }
});
exports.createProduct = createProduct;
// Get All Products
const getAllProducts = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find();
        res.json(products);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllProducts = getAllProducts;
// Get Product By Id
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.getProductById = getProductById;
