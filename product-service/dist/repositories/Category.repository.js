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
        return yield Category_1.Category.findById(id);
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
        return yield Category_1.Category.find(query).sort({ createdOn: -1 });
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
        return yield Category_1.Category.findByIdAndUpdate(id, updateData, { new: true });
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while updating category by ID => ${error}`);
        throw new Error("Error while updating category by ID");
    }
});
exports.updateCategoriesById = updateCategoriesById;
// Function to delete a category by ID
const deleteCategoriesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Category_1.Category.findByIdAndDelete(id);
    }
    catch (error) {
        shared_constants_1.logger.error(`Error while deleting category by ID => ${error}`);
        throw new Error("Error while deleting category by ID");
    }
});
exports.deleteCategoriesById = deleteCategoriesById;
