"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const categorySchema_1 = require("../validations/categorySchema");
const shared_constants_1 = require("shared-constants");
const router = express_1.default.Router();
router.post("/create-category", (0, shared_constants_1.validate)(categorySchema_1.createCategorySchema), categoryController_1.createCategory);
router.post("/", (0, shared_constants_1.validate)(categorySchema_1.getAllCategoriesSchema), categoryController_1.getAllCategoriesWithFilters);
// router.get("/", getAllCategories);
router.get("/", categoryController_1.searchCategories);
router.get("/:id", categoryController_1.getCategoryById);
router.post("/update-category/:id", (0, shared_constants_1.validate)(categorySchema_1.updateCategorySchema), categoryController_1.updateCategoryById);
router.post("/delete-category", (0, shared_constants_1.validate)(categorySchema_1.deleteCategorySchema), categoryController_1.deleteCategoryById);
exports.default = router;
