import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongodb";
import indexRoutes from "./routes/indexRoutes";
import { authMiddleware } from "auth-lib";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authMiddleware, indexRoutes);

connectDB(); // Connect to MongoDB

export default app;
