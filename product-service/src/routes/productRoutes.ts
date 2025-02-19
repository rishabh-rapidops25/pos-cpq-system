import { Router } from "express";
import {
  createProduct,
  generateQuotation,
  getAllProducts,
  getProductById,
} from "../controllers/productController";
import { validate } from "shared-constants";
import { productSchema } from "../validations/productSchema";

const router = Router();
router.post("/create-product", validate(productSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/generate-quotation", generateQuotation);

export default router;
