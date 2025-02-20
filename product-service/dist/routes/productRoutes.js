"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const shared_constants_1 = require("shared-constants");
const productSchema_1 = require("../validations/productSchema");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post("/create-product", (0, shared_constants_1.validate)(productSchema_1.productSchema), productController_1.createProduct);
router.get("/", productController_1.getAllProducts);
router.get("/:id", productController_1.getProductById);
router.post("/generate-quotation", productController_1.generateQuotation);
// To download pdf
router.get("/download/:fileName", (req, res) => {
    const filePath = path_1.default.join(__dirname, "../../uploads", req.params.fileName);
    res.download(filePath);
});
exports.default = router;
