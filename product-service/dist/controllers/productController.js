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
// import multer from "multer";
// Extend Request type to include `file`
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }
// Create Product
// export const createProduct = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const {
//       productName,
//       price,
//       category,
//       inStock,
//       description,
//       imageURL,
//       colors,
//       mount,
//       materials,
//     } = req.body;
//     // Ensure values are always arrays (support both string and array inputs)
//     const colorArray = Array.isArray(colors)
//       ? colors
//       : typeof colors === "string"
//       ? colors.split(",")
//       : [];
//     const mountArray = Array.isArray(mount)
//       ? mount
//       : typeof mount === "string"
//       ? mount.split(",")
//       : [];
//     const materialArray = Array.isArray(materials)
//       ? materials
//       : typeof materials === "string"
//       ? materials.split(",")
//       : [];
//     // Define pricing rules dynamically
//     const pricingRules = {
//       colors: { red: 10, blue: 5, black: 8, white: 7 },
//       mount: { inside: 20, outside: 15 },
//       materials: { wood: 30, aluminum: 25, cloth: 10 },
//     };
//     // Calculate final price based on dynamic rules
//     const finalPrice = calculateFinalPrice(
//       price,
//       { colors: colorArray, mount: mountArray, materials: materialArray },
//       pricingRules
//     );
//     // Create and save product
//     const product = new Product({
//       productName,
//       price,
//       finalPrice,
//       category,
//       inStock,
//       description,
//       imageURL,
//       colors: colorArray,
//       mount: mountArray,
//       materials: materialArray,
//     });
//     await product.save();
//     logger.info("Product successfully created");
//     // Generate PDF with updated price quotation
//     const pdfDocument = generatePDF({
//       productName,
//       price,
//       finalPrice,
//       colors: colorArray,
//       mount: mountArray,
//       materials: materialArray,
//     });
//     // Return product creation response and attach PDF
//     res.status(HttpStatusCodes.CREATED).json({
//       statusCode: HttpStatusCodes.CREATED,
//       httpResponse: HttpResponseMessages.CREATED,
//       message: "Product Created Successfully",
//       product,
//       pdf: pdfDocument, // Assuming it's a file path
//     });
//   } catch (err) {
//     logger.error("Internal Server Error", err);
//     res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
//       statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
//       httpResponse: HttpResponseMessages.INTERNAL_SERVER_ERROR,
//       error: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
//       message: "Something went wrong while creating product",
//     });
//   }
// };
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price, category, inStock, description, imageURL, colors = [], mount = [], materials = [], } = req.body;
        // Normalize input values
        const colorArray = Array.isArray(colors)
            ? colors
            : typeof colors === "string"
                ? colors.split(",")
                : [];
        const mountArray = Array.isArray(mount)
            ? mount
            : typeof mount === "string"
                ? mount.split(",")
                : [];
        const materialArray = Array.isArray(materials)
            ? materials
            : typeof materials === "string"
                ? materials.split(",")
                : [];
        // Fetch prices from DB and calculate final price
        const finalPrice = yield (0, priceCalculator_1.calculateFinalPrice)(price, colorArray, mountArray, materialArray);
        // Create the product in DB
        const product = new Product_1.Product({
            productName,
            price,
            finalPrice,
            category,
            inStock,
            description,
            imageURL,
            colors: colorArray,
            mount: mountArray,
            materials: materialArray,
        });
        yield product.save();
        shared_constants_1.logger.info("Product successfully created");
        // Generate the PDF after the product is fully configured
        const pdfDocument = (0, pdfGenerator_1.generatePDF)({
            productName,
            price,
            finalPrice,
            colors: colorArray,
            mount: mountArray,
            materials: materialArray,
        });
        res.status(201).json({
            statusCode: 201,
            message: "Product Created Successfully",
            product,
            pdf: pdfDocument,
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
        const { price, colors = [], mount = [], materials = [] } = req.body;
        // Normalize input values (convert to array if needed)
        const colorArray = Array.isArray(colors)
            ? colors
            : typeof colors === "string"
                ? colors.split(",")
                : [];
        const mountArray = Array.isArray(mount)
            ? mount
            : typeof mount === "string"
                ? mount.split(",")
                : [];
        const materialArray = Array.isArray(materials)
            ? materials
            : typeof materials === "string"
                ? materials.split(",")
                : [];
        // Fetch predefined prices from DB and calculate final price
        const finalPrice = yield (0, priceCalculator_1.calculateFinalPrice)(price, colorArray, mountArray, materialArray);
        // Generate PDF for quotation
        const pdfDocument = (0, pdfGenerator_1.generatePDF)({
            productName: "Custom Product Quotation",
            price,
            finalPrice,
            colors: colorArray,
            mount: mountArray,
            materials: materialArray,
        });
        res.status(200).json({
            statusCode: 200,
            message: "Quotation generated successfully",
            finalPrice,
            pdf: pdfDocument,
        });
    }
    catch (err) {
        shared_constants_1.logger.error("Error generating quotation", err);
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong while generating the quotation",
        });
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
