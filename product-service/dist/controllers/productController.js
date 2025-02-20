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
// generate Quotations
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
//       colors = [],
//       mount = [],
//       materials = [],
//     } = req.body;
//     // Format the price arrays
//     const colorPrices = formatPrices(colors, "colorCode");
//     const mountPrices = formatPrices(mount, "mountType");
//     const materialPrices = formatPrices(materials, "materialType");
//     // Calculate the final price
//     const finalPrice = await calculateFinalPrice(
//       price,
//       colorPrices,
//       mountPrices,
//       materialPrices
//     );
//     // Create the product object
//     const product = new Product({
//       productName,
//       price,
//       finalPrice,
//       category,
//       inStock,
//       description,
//       imageURL,
//       colors: colors.map((c: { colorCode: string }) => c.colorCode),
//       mount: mount.map((m: { mountType: string }) => m.mountType),
//       materials: materials.map((m: { materialType: string }) => m.materialType),
//     });
//     // Save the product to DB
//     await product.save();
//     // Save pricing options
//     await Promise.all([
//       savePricingOptions(colors, "color"),
//       savePricingOptions(mount, "mount"),
//       savePricingOptions(materials, "material"),
//     ]);
//     logger.info("Product successfully created");
//     res.status(201).json({
//       statusCode: 201,
//       message: "Product Created Successfully",
//       product,
//     });
//   } catch (err) {
//     logger.error("Error creating product", err);
//     res.status(500).json({
//       statusCode: 500,
//       message: "Something went wrong while creating the product",
//     });
//   }
// };
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price, category, inStock, description, imageURL, colors = [], mount = [], materials = [], } = req.body;
        // Calculate final price
        const finalPrice = yield (0, priceCalculator_1.calculateFinalPrice)(price, colors, mount, materials);
        // Create the product object
        const product = new Product_1.Product({
            productName,
            price,
            finalPrice,
            category,
            inStock,
            description,
            imageURL,
            colors,
            mount,
            materials,
        });
        // Save the product to DB
        yield product.save();
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
// export const generateQuotation = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { price, colors = [], mount = [], materials = [] } = req.body;
//     // Ensure arrays are formatted correctly
//     const selectedColors = colors.map((color: string) => ({
//       colorCode: color,
//     }));
//     const selectedMounts = mount.map((mountType: string) => ({ mountType }));
//     const selectedMaterials = materials.map((materialType: string) => ({
//       materialType,
//     }));
//     // Calculate final price using predefined pricing data from DB
//     const finalPrice = await calculateFinalPrice(
//       price,
//       selectedColors,
//       selectedMounts,
//       selectedMaterials
//     );
//     console.log(finalPrice, "FInalprice");
//     // Generate PDF with updated finalPrice
//     const pdfFilePath = generatePDF({
//       productName: "Custom Product Quotation",
//       price,
//       finalPrice, // Updated final price
//       colors,
//       mount,
//       materials,
//     });
//     res.status(200).json({
//       statusCode: 200,
//       message: "Quotation generated successfully",
//       finalPrice, // Show updated price in response
//       pdfFilePath, // Return the generated PDF file path
//     });
//   } catch (err) {
//     logger.error("Error generating quotation", err);
//     res.status(500).json({
//       statusCode: 500,
//       message: "Something went wrong while generating the quotation",
//     });
//   }
// };
// Get All Products
const generateQuotation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price, colors = [], mount = [], materials = [] } = req.body;
        // Calculate final price using predefined pricing data from DB
        const finalPrice = yield (0, priceCalculator_1.calculateFinalPrice)(price, colors, mount, materials);
        console.log(finalPrice, "generate");
        // Generate PDF
        const pdfFilePath = (0, pdfGenerator_1.generatePDF)({
            productName: "Custom Product Quotation",
            price,
            finalPrice, // Updated final price
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
