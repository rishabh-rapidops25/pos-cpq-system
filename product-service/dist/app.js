"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("./config/mongodb");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const auth_lib_1 = require("auth-lib");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/products", auth_lib_1.authMiddleware, productRoutes_1.default);
(0, mongodb_1.connectDB)(); // Connect to MongoDB
exports.default = app;
