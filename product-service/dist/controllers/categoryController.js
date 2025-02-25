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
exports.deleteCategoryById = exports.updateCategoryById = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = require("../models/Category");
/**
 * @desc Create a new category
 * @route POST /api/categories
 */
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, code, status, description } = req.body;
        const existingCategory = yield Category_1.Category.findOne({ code });
        if (existingCategory) {
            res.status(400).json({ message: "Category code already exists" });
            return;
        }
        const category = new Category_1.Category({ name, code, status, description });
        yield category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating category", error });
        return;
    }
});
exports.createCategory = createCategory;
/**
 * @desc Get all categories with filters
 * @route GET /api/categories
 */
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, status, code } = req.query;
        const query = {};
        if (name)
            query.name = { $regex: new RegExp(name, "i") };
        if (status)
            query.status = status;
        if (code)
            query.code = code;
        const categories = yield Category_1.Category.find(query).sort({ createdOn: -1 });
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
});
exports.getAllCategories = getAllCategories;
/**
 * @desc Get a single category by ID
 * @route GET /api/categories/:id
 */
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching category", error });
        return;
    }
});
exports.getCategoryById = getCategoryById;
/**
 * @desc Update a category by ID
 * @route PUT /api/categories/:id
 */
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, code, status, description } = req.body;
        const category = yield Category_1.Category.findByIdAndUpdate(req.params.id, { name, code, status, description, updatedOn: new Date() }, { new: true });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating category", error });
        return;
    }
});
exports.updateCategoryById = updateCategoryById;
/**
 * @desc Delete a category by ID
 * @route DELETE /api/categories/:id
 */
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
        return;
    }
});
exports.deleteCategoryById = deleteCategoryById;
