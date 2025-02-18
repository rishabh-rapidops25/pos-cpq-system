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
const shared_constants_1 = require("shared-constants");
// Create Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price, category, inStock, description } = req.body;
        const product = new Product_1.Product({
            productName,
            price,
            category,
            inStock,
            description,
        });
        yield product.save();
        shared_constants_1.logger.info("Product successfully created");
        res.status(shared_constants_1.HttpStatusCodes.CREATED).json({
            statusCode: shared_constants_1.HttpStatusCodes.CREATED,
            httpResponse: shared_constants_1.HttpResponseMessages.CREATED,
            message: "Product Created Successfully",
            product,
        });
        return;
    }
    catch (err) {
        shared_constants_1.logger.error("Internal Server Error", err);
        res.status(shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            httpResponse: shared_constants_1.HttpResponseMessages.INTERNAL_SERVER_ERROR,
            error: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong while creating product",
        });
        return;
    }
});
exports.createProduct = createProduct;
// Get All Products
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find();
        shared_constants_1.logger.info("Products fetched successfully");
        res.status(shared_constants_1.HttpStatusCodes.OK).json({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            httpResponse: shared_constants_1.HttpResponseMessages.SUCCESS,
            message: "Product Listed Successfully",
            products,
        });
        return;
    }
    catch (err) {
        shared_constants_1.logger.error("Internal Server Error", err);
        res.status(shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            httpResponse: shared_constants_1.HttpResponseMessages.INTERNAL_SERVER_ERROR,
            error: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong while fetching product",
        });
        return;
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        shared_constants_1.logger.info(`Received request to fetch product with ID: ${id}`);
        const product = yield Product_1.Product.findById(id);
        if (!product) {
            res.status(shared_constants_1.HttpStatusCodes.NOT_FOUND).json({
                statusCode: shared_constants_1.HttpStatusCodes.NOT_FOUND,
                httpResponse: shared_constants_1.HttpResponseMessages.NOT_FOUND,
                error: shared_constants_1.ErrorMessageCodes.RESOURCE_NOT_FOUND,
                message: "Product Not Found",
            });
            return;
        }
        res.status(shared_constants_1.HttpStatusCodes.OK).json({
            statusCode: shared_constants_1.HttpStatusCodes.OK,
            httpResponse: shared_constants_1.HttpResponseMessages.SUCCESS,
            message: "Product fetched successfully by product ID",
            product,
        });
        return;
    }
    catch (err) {
        shared_constants_1.logger.error("Internal Server Error", err);
        res.status(shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: shared_constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR,
            httpResponse: shared_constants_1.HttpResponseMessages.INTERNAL_SERVER_ERROR,
            error: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong while fetching product",
        });
        return;
    }
});
exports.getProductById = getProductById;
