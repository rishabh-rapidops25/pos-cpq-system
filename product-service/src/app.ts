import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/mongodb";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

connectDB(); // Connect to MongoDB

export default app;
