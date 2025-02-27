"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const componentGroupRoutes_1 = __importDefault(require("./componentGroupRoutes"));
const app = (0, express_1.default)();
app.use("/products", productRoutes_1.default);
app.use("/category", categoryRoutes_1.default);
app.use("/component", componentGroupRoutes_1.default);
exports.default = app;
