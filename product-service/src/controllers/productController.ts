import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import { logger } from "../utils/logger";

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
    res.json({ message: "Product Created", product });
    return;
  } catch (err) {
    logger.error("Internal Server Error", err);
    res.status(500).json({ message: "Internal Server Error>>", err });
    return;
  }
};

// Get All Products
export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get Product By Id
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
