import express from "express";
import {
  createCategory,
  // getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  searchCategories,
  getAllCategoriesWithFilters,
} from "../controllers/categoryController";
import {
  createCategorySchema,
  deleteCategorySchema,
  getAllCategoriesSchema,
  // searchCategorySchema,
  updateCategorySchema,
} from "../validations/categorySchema";
import { validate } from "shared-constants";

// router.get("/", getAllCategories);
const router = express.Router();

router.post("/", validate(getAllCategoriesSchema), getAllCategoriesWithFilters);

router.post("/create-category", validate(createCategorySchema), createCategory);

router.get("/", searchCategories);

router.get("/:id", getCategoryById);

router.put(
  "/update-category/:id",
  validate(updateCategorySchema),
  updateCategoryById
);

router.post(
  "/delete-category",
  validate(deleteCategorySchema),
  deleteCategoryById
);
// DELETE /api/delete-category?ids=1,2,3

export default router;
