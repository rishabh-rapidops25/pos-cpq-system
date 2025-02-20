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
exports.getProductById = exports.getAllProducts = exports.generateQuotation = exports.createProduct = void 0;
const Product_1 = require("../models/Product");
const shared_constants_1 = require("shared-constants");
const pdfGenerator_1 = require("../utils/pdfGenerator"); // Custom function to generate PDF
const priceCalculator_1 = require("../utils/priceCalculator"); // Custom function to calculate price
const savePricingOptions_1 = require("../utils/savePricingOptions");
const calculatePrice_1 = require("../utils/calculatePrice");
// Create Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price, category, inStock, description, imageURL, colors = [], mount = [], materials = [], } = req.body;
        // Format the price arrays
        const colorPrices = (0, savePricingOptions_1.formatPrices)(colors, "colorCode");
        const mountPrices = (0, savePricingOptions_1.formatPrices)(mount, "mountType");
        const materialPrices = (0, savePricingOptions_1.formatPrices)(materials, "materialType");
        // Calculate the final price
        const finalPrice = yield (0, priceCalculator_1.calculateFinalPrice)(price, colorPrices, mountPrices, materialPrices);
        // Create the product object
        const product = new Product_1.Product({
            productName,
            price,
            finalPrice,
            category,
            inStock,
            description,
            imageURL,
            colors: colors.map((c) => c.colorCode),
            mount: mount.map((m) => m.mountType),
            materials: materials.map((m) => m.materialType),
        });
        // Save the product to DB
        yield product.save();
        // Save pricing options and link them to the product
        yield Promise.all([
            (0, savePricingOptions_1.savePricingOptions)(colors, "color", product._id.toString()),
            (0, savePricingOptions_1.savePricingOptions)(mount, "mount", product._id.toString()),
            (0, savePricingOptions_1.savePricingOptions)(materials, "material", product._id.toString()),
        ]);
        shared_constants_1.logger.info("Product successfully created");
        res.status(201).json({
            statusCode: 201,
            message: "Product Created Successfully",
            product,
        });
    }
    catch (err) {
        shared_constants_1.logger.error("Error creating product", err);
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while creating the product",
        });
    }
});
exports.createProduct = createProduct;
// generate Quotations
const generateQuotation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Product ID
        const { colors = [], mount = [], materials = [] } = req.body;
        // Fetch product from DB
        const product = yield Product_1.Product.findById(id);
        if (!product) {
            res.status(404).json({
                statusCode: 404,
                message: "Product not found",
            });
            return;
        }
        // Extract base price
        const basePrice = product.price;
        // Convert selections into required format
        const selectedColors = colors.map((color) => ({
            colorCode: color,
        }));
        const selectedMounts = mount.map((mountType) => ({ mountType }));
        const selectedMaterials = materials.map((materialType) => ({
            materialType,
        }));
        // Calculate final price with selected options
        const finalPrice = yield (0, calculatePrice_1.calculatePdfFinalPrice)(basePrice, selectedColors, selectedMounts, selectedMaterials);
        // Generate PDF
        const pdfFilePath = (0, pdfGenerator_1.generatePDF)({
            productName: product.productName,
            price: basePrice,
            finalPrice,
            colors,
            mount,
            materials,
        });
        res.status(200).json({
            statusCode: 200,
            message: "Quotation generated successfully",
            finalPrice,
            pdfFilePath,
        });
        return;
    }
    catch (err) {
        shared_constants_1.logger.error("Error generating quotation:", err);
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while generating the quotation",
        });
        return;
    }
});
exports.generateQuotation = generateQuotation;
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
