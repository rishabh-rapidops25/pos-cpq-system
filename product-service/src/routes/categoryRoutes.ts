import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  searchCategories,
} from "../controllers/categoryController";
import {
  createCategorySchema,
  deleteCategorySchema,
  getAllCategoriesSchema,
  searchCategorySchema,
  updateCategorySchema,
} from "../validations/categorySchema";
import { validate } from "shared-constants";

const router = express.Router();

router.post("/create-category", validate(createCategorySchema), createCategory);
router.post("/", validate(getAllCategoriesSchema), getAllCategories);
router.post("/search", validate(searchCategorySchema), searchCategories);
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
