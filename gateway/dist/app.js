"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Proxy to User Service
app.use("/api/users", (0, http_proxy_middleware_1.createProxyMiddleware)({ target: "http://user-service:3001", changeOrigin: true }));
// Proxy to Product Service
app.use("/api/products", (0, http_proxy_middleware_1.createProxyMiddleware)({ target: "http://product-service:3002", changeOrigin: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
