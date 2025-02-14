import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";

// Create Product
export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {productName, price, category, inStock, description} = req.body
        const product = new Product(req.body);
        await product.save();
        res.json({ message: "Product Created", product });
    } catch (err) {
        next(err);
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
