import { Router } from "express";
import {
  createProduct,
  generateQuotation,
  getAllProducts,
  getProductById,
} from "../controllers/productController";
import { validate } from "shared-constants";
import { productSchema } from "../validations/productSchema";
import path from "path";

const router = Router();
router.post("/create-product", validate(productSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/:id/quotation", generateQuotation);
// To download pdf
// router.get("/download/:fileName", (req, res) => {
//   const filePath = path.join(__dirname, "../../uploads", req.params.fileName);
//   res.download(filePath);
// });

export default router;
