import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongodb";
import indexRoutes from "./routes/indexRoutes";
import { authMiddleware } from "auth-lib";
import { logger } from "shared-constants";
const app = express();

const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL;

app.use(cors());
app.use(express.json());
app.use("/api", authMiddleware, indexRoutes);

export const startServer = () => {
  try {
    connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      logger.info(`===============================================`);
      logger.info("✅ Database Connected Successfully....");
      logger.info(`Product-Service Server is running on port ${PORT}`);
      logger.info(`${PROTOCOL}:${PORT}/api/products`);
      logger.info(`===============================================`);
    });
  } catch (error) {
    logger.error("❌ Error starting the server:", error);
    process.exit(1); // Exit process on failure
  }
};
