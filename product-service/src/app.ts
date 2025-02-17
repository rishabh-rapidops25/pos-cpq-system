import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongodb";
import productRoutes from "./routes/productRoutes";
import { authMiddleware } from "auth-lib";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", authMiddleware, productRoutes);

connectDB(); // Connect to MongoDB

export default app;
