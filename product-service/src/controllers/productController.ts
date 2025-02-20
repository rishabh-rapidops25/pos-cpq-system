import { Request, Response } from "express";
import { Product } from "../models/Product";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
} from "shared-constants";
import { generatePDF } from "../utils/pdfGenerator"; // Custom function to generate PDF
import { calculateFinalPrice } from "../utils/priceCalculator"; // Custom function to calculate price
import { formatPrices, savePricingOptions } from "../utils/savePricingOptions";
import { calculatePdfFinalPrice } from "../utils/calculatePrice";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      productName,
      price,
      category,
      inStock,
      description,
      imageURL,
      colors = [],
      mount = [],
      materials = [],
    } = req.body;

    // Format the price arrays
    const colorPrices = formatPrices(colors, "colorCode");
    const mountPrices = formatPrices(mount, "mountType");
    const materialPrices = formatPrices(materials, "materialType");

    // Calculate the final price
    const finalPrice = await calculateFinalPrice(
      price,
      colorPrices,
      mountPrices,
      materialPrices
    );

    // Create the product object
    const product = new Product({
      productName,
      price,
      finalPrice,
      category,
      inStock,
      description,
      imageURL,
      colors: colors.map((c: { colorCode: string }) => c.colorCode),
      mount: mount.map((m: { mountType: string }) => m.mountType),
      materials: materials.map((m: { materialType: string }) => m.materialType),
    });

    // Save the product to DB
    await product.save();

    // Save pricing options and link them to the product
    await Promise.all([
      savePricingOptions(colors, "color", product._id.toString()),
      savePricingOptions(mount, "mount", product._id.toString()),
      savePricingOptions(materials, "material", product._id.toString()),
    ]);

    logger.info("Product successfully created");

    res.status(201).json({
      statusCode: 201,
      message: "Product Created Successfully",
      product,
    });
  } catch (err) {
    logger.error("Error creating product", err);
    res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while creating the product",
    });
  }
};

// generate Quotations
export const generateQuotation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Product ID
    const { colors = [], mount = [], materials = [] } = req.body;

    // Fetch product from DB
    const product = await Product.findById(id);

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
    const selectedColors = colors.map((color: string) => ({
      colorCode: color,
    }));
    const selectedMounts = mount.map((mountType: string) => ({ mountType }));
    const selectedMaterials = materials.map((materialType: string) => ({
      materialType,
    }));

    // Calculate final price with selected options
    const finalPrice = await calculatePdfFinalPrice(
      basePrice,
      selectedColors,
      selectedMounts,
      selectedMaterials
    );
    // Generate PDF
    const pdfFilePath = generatePDF({
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
  } catch (err) {
    logger.error("Error generating quotation:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while generating the quotation",
    });
    return;
  }
};

// Get All Products
export const getAllProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    logger.info("Products fetched successfully");

    res.status(HttpStatusCodes.OK).json({
      statusCode: HttpStatusCodes.OK,
      httpResponse: HttpResponseMessages.SUCCESS,
      message: "Product Listed Successfully",
      products,
    });
    return;
  } catch (err) {
    logger.error("Internal Server Error", err);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponse: HttpResponseMessages.INTERNAL_SERVER_ERROR,
      error: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong while fetching product",
    });
    return;
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info(`Received request to fetch product with ID: ${id}`);

    const product = await Product.findById(id);

    if (!product) {
      res.status(HttpStatusCodes.NOT_FOUND).json({
        statusCode: HttpStatusCodes.NOT_FOUND,
        httpResponse: HttpResponseMessages.NOT_FOUND,
        error: ErrorMessageCodes.RESOURCE_NOT_FOUND,
        message: "Product Not Found",
      });
      return;
    }

    res.status(HttpStatusCodes.OK).json({
      statusCode: HttpStatusCodes.OK,
      httpResponse: HttpResponseMessages.SUCCESS,
      message: "Product fetched successfully by product ID",
      product,
    });

    return;
  } catch (err) {
    logger.error("Internal Server Error", err);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponse: HttpResponseMessages.INTERNAL_SERVER_ERROR,
      error: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong while fetching product",
    });
    return;
  }
};
