import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController";

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;
