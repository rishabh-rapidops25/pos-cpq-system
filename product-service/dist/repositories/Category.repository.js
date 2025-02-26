"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriesById = exports.updateCategoriesById = exports.findCategoriesWithFilters = exports.findCategoryById = exports.findCategoryByCode = exports.saveCategory = void 0;
const Category_1 = require("../models/Category");
const shared_constants_1 = require("shared-constants");
// Function to save a category
const saveCategory = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new Category_1.Category(input);
        return yield category.save();
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while saving category => ${error}`);
        throw new Error("Error while saving category details in DB");
    }
});
exports.saveCategory = saveCategory;
// Function to find a category by code
const findCategoryByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Category_1.Category.findOne({ code });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while finding category by code => ${error}`);
        throw new Error("Error while finding category by code");
    }
});
exports.findCategoryByCode = findCategoryByCode;
// Function to find a category by ID
const findCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Category_1.Category.findById({ id, isDeleted: 0 });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while finding category by ID => ${error}`);
        throw new Error("Error while finding category by ID");
    }
});
exports.findCategoryById = findCategoryById;
// Function to find categories with filters
const findCategoriesWithFilters = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Merge the provided query with the isDeleted condition
        const filterQuery = Object.assign(Object.assign({}, query), { isDeleted: 0 }); // isDeleted = 0 to exclude deleted categories
        return yield Category_1.Category.find(filterQuery).sort({ createdOn: -1 });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while finding categories with filters => ${error}`);
        throw new Error("Error while finding categories with filters");
    }
});
exports.findCategoriesWithFilters = findCategoriesWithFilters;
// Function to update a category by ID
const updateCategoriesById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Category_1.Category.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateData), { isDeleted: 0 }), { new: true });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while updating category by ID => ${error}`);
        throw new Error("Error while updating category by ID");
    }
});
exports.updateCategoriesById = updateCategoriesById;
// Function to delete multiple categories by their IDs
const deleteCategoriesById = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the $in operator to match any of the provided IDs
        const result = yield Category_1.Category.updateMany({ _id: { $in: ids }, isDeleted: { $ne: 1 } }, // Ensure that categories are not already deleted
        { $set: { isDeleted: 1 } }, // Set isDeleted to 1
        { new: true } // Returns the updated categories
        );
        return result; // Return the result of the update operation
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while deleting categories by IDs => ${error}`);
        throw new Error("Error while deleting categories by IDs");
    }
});
exports.deleteCategoriesById = deleteCategoriesById;
