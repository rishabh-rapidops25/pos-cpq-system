import { Request, Response } from "express";
import { Product } from "../models/Product";
import Joi from "joi";
import { NextFunction } from "express-serve-static-core";

// Validation Schema
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
});

// Create Product
export const createProduct = async (req: Request, res: Response, next : NextFunction) => {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ message: "Product Created", product });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    next()
    }
};

// Get All Products
export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
