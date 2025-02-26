import { Request, Response } from "express";
import { Product } from "../models/Product";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
  sendResponse,
} from "shared-constants";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productName, price, category, inStock, description, imageURL } =
      req.body;
    // Check if category with given code already exists
    const existingProduct = await Product.find(productName);
    if (existingProduct) {
      logger.error("Product name already exists");
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: ErrorMessageCodes.INVALID_REQUEST,
        data: "Product name already exists",
      });
      return;
    }

    const product = new Product({
      productName,
      price,
      category,
      inStock,
      description,
      imageURL,
    });

    await product.save();
    logger.info("Product successfully created");
    sendResponse({
      statusCode: HttpStatusCodes.CREATED,
      res,
      message: HttpResponseMessages.CREATED,
      data: product,
    });
    return;
  } catch (err) {
    logger.error("Something went wrong while creating product", err);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: err,
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
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: products,
    });
    return;
  } catch (err) {
    logger.error("Something went wrong while fetching product", err);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: err,
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

    const product = await Product.findById(id);

    if (!product) {
      logger.info("Product Not Found");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
      });
      return;
    }
    logger.info("Product fetched successfully by product ID");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: product,
    });
    return;
  } catch (err) {
    logger.error("Something went wrong while fetching product", err);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: err,
    });
    return;
  }
};
