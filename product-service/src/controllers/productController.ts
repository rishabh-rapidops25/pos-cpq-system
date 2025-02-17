import { Request, Response } from "express";
import { Product } from "../models/Product";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
} from "shared-constants";
// Create Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productName, price, category, inStock, description } = req.body;
    const product = new Product({
      productName,
      price,
      category,
      inStock,
      description,
    });
    await product.save();
    logger.info("Product successfully created");
    res.status(HttpStatusCodes.CREATED).json({
      statusCode: HttpStatusCodes.CREATED,
      httpResponse: HttpResponseMessages.CREATED,
      message: "Product Created Successfully",
      product,
    });
    return;
  } catch (err) {
    logger.error("Internal Server Error", err);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponse: HttpResponseMessages.INTERNAL_SERVER_ERROR,
      error: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      message: "Something went wrong while creating product",
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

// Get Product By Id
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(HttpStatusCodes.NOT_FOUND).json({
        statusCode: HttpStatusCodes.NOT_FOUND,
        httpResponse: HttpResponseMessages.NOT_FOUND,
        error: ErrorMessageCodes.RESOURCE_NOT_FOUND,
        message: "Product Not Found",
      });
      return;
    }
    res.json(product);
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
