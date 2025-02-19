import { Request, Response } from "express";
import { Product } from "../models/Product";
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
} from "shared-constants";

// import multer from "multer";
// Extend Request type to include `file`
// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }

// Create Product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productName, price, category, inStock, description, imageURL } =
      req.body;

    // Check if file was uploaded
    // if (!req.file) {
    //   res.status(HttpStatusCodes.BAD_REQUEST).json({
    //     statusCode: HttpStatusCodes.BAD_REQUEST,
    //     httpResponse: HttpResponseMessages.BAD_REQUEST,
    //     error: ErrorMessageCodes.INVALID_REQUEST,
    //     message: "Image is required",
    //   });
    //   return;
    // }

    // Construct image URL
    // const imageURL = `${req.protocol}://${req.get("host")}/uploads/${
    //   req.file.filename
    // }`;

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
