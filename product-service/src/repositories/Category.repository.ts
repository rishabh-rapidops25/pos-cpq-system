import { Category } from "../models/Category";
import { logger } from "shared-constants";
import { CategoryFilter, ICategory } from "../interfaces/Category.interface";

// Function to save a category
export const saveCategory = async (input: ICategory) => {
  try {
    const category = new Category(input);
    return await category.save();
  } catch (error) {
    logger.error(`Error while saving category => ${error}`);
    throw new Error("Error while saving category details in DB");
  }
};

// Function to find a category by code
export const findCategoryByCode = async (code: number) => {
  try {
    return await Category.findOne({ code });
  } catch (error) {
    logger.error(`Error while finding category by code => ${error}`);
    throw new Error("Error while finding category by code");
  }
};

// Function to find a category by ID
export const findCategoryById = async (id: string) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    logger.error(`Error while finding category by ID => ${error}`);
    throw new Error("Error while finding category by ID");
  }
};

// Function to find categories with filters
export const findCategoriesWithFilters = async (query: CategoryFilter) => {
  try {
    return await Category.find(query).sort({ createdOn: -1 });
  } catch (error) {
    logger.error(`Error while finding categories with filters => ${error}`);
    throw new Error("Error while finding categories with filters");
  }
};

// Function to update a category by ID
export const updateCategoriesById = async (
  id: string,
  updateData: Partial<ICategory>
) => {
  try {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    logger.error(`Error while updating category by ID => ${error}`);
    throw new Error("Error while updating category by ID");
  }
};

// Function to delete a category by ID
export const deleteCategoriesById = async (id: string) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    logger.error(`Error while deleting category by ID => ${error}`);
    throw new Error("Error while deleting category by ID");
  }
};
