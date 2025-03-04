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
    return await Category.findById({ _id: id, isDeleted: 0 });
  } catch (error) {
    logger.error(`Error while finding category by ID => ${error}`);
    throw new Error("Error while finding category by ID");
  }
};

// Function to find categories with filters
export const getCategories = async () => {
  try {
    return await Category.find({ isDeleted: 0 });
  } catch (error) {
    logger.error(`Error while finding categories => ${error}`);
    throw new Error("Error while finding categories with filters");
  }
};

// Function to find categories with filters
export const findCategoriesWithFilters = async (query: CategoryFilter) => {
  try {
    // Merge the provided query with the isDeleted condition
    const filterQuery = { ...query, isDeleted: 0 }; // isDeleted = 0 to exclude deleted categories

    return await Category.find(filterQuery).sort({ createdOn: -1 });
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
    return await Category.findByIdAndUpdate(
      id,
      { ...updateData, isDeleted: 0 },
      { new: true }
    );
  } catch (error) {
    logger.error(`Error while updating category by ID => ${error}`);
    throw new Error("Error while updating category by ID");
  }
};

// Function to delete multiple categories by their IDs
export const deleteCategoriesById = async (ids: string[]) => {
  try {
    // Use the $in operator to match any of the provided IDs
    const result = await Category.updateMany(
      { _id: { $in: ids }, isDeleted: { $ne: 1 } }, // Ensure that categories are not already deleted
      { $set: { isDeleted: 1 } }, // Set isDeleted to 1
      { new: true } // Returns the updated categories
    );

    return result; // Return the result of the update operation
  } catch (error) {
    logger.error(`Error while deleting categories by IDs => ${error}`);
    throw new Error("Error while deleting categories by IDs");
  }
};

// Function to delete multiple categories by their IDs (Soft Delete)
// export const deleteCategoriesById = async (ids: string[]) => {
//   try {
//     // Use the $in operator to match any of the provided IDs and ensure that categories are not already deleted
//     const result = await Category.updateMany(
//       { _id: { $in: ids }, isDeleted: { $ne: 1 } }, // Ensure categories are not already soft-deleted
//       { $set: { isDeleted: 1 } }, // Set isDeleted to 1 (soft delete)
//     );

//     // If no categories were modified, return a result indicating that no matching categories were found
//     if (result.nModified === 0) {
//       return { message: "No categories were deleted. Either they were already deleted or the IDs were not found." };
//     }

//     return result; // Return the result of the update operation
//   } catch (error) {
//     logger.error(`Error while deleting categories by IDs => ${error}`);
//     throw new Error(`Error while deleting categories by IDs: ${error.message}`);
//   }
// };
