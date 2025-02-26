import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categorySchema";
import { validate } from "shared-constants";

const router = express.Router();

router.post("/create-category", validate(createCategorySchema), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post(
  "/update-category/:id",
  validate(updateCategorySchema),
  updateCategoryById
);
router.delete("/delete-category/:id", deleteCategoryById);

export default router;
