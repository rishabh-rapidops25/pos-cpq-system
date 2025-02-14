import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const app = express();

app.use(cors());    
app.use(express.json());

// Proxy to User Service
app.use("/api/users", createProxyMiddleware({ target: "http://user-service:3001", changeOrigin: true }));

// Proxy to Product Service
app.use("/api/products", createProxyMiddleware({ target: "http://product-service:3002", changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
