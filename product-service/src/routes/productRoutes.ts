import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/productController";

const router = Router();
router.post("/", async (req, res, next) => {
    try {
      await createProduct(req, res, next);
    } catch (error) {
      next(error);
    }
  });
router.get("/", getAllProducts);

export default router;
