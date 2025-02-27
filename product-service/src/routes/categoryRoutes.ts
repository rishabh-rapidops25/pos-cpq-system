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
  deleteCategorySchema,
  getAllCategoriesSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
} from "../validations/categorySchema";
import { validate } from "shared-constants";

const router = express.Router();

router.post("/create-category", validate(createCategorySchema), createCategory);
router.post("/", validate(getAllCategoriesSchema), getAllCategories);
router.get("/:id", getCategoryById);
router.post(
  "/update-category/:id",
  validate(updateCategorySchema),
  updateCategoryById
);
router.post(
  "/delete-category",
  validate(deleteCategorySchema),
  deleteCategoryById
);

export default router;
