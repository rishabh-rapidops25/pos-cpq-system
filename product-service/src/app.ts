import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { connectDB } from "./config/mongodb";
import { authMiddleware } from "auth-lib";
import { logger } from "shared-constants";
import indexRoutes from "./routes/indexRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT, HOST } = process.env;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    "==========> req url:",
    req.url,
    "=======> req method:",
    req.method
  );
  next();
});

app.use("/api", authMiddleware, indexRoutes);

export const startServer = () => {
  try {
    connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      logger.info(`===============================================`);
      logger.info("✅ Database Connected Successfully....");
      logger.info(`Product-Service Server is running on port ${PORT}`);
      logger.info(`http://${HOST}:${PORT}/api`);
      logger.info(`===============================================`);
    });
  } catch (error) {
    logger.error("❌ Error starting the server:", error);
    process.exit(1); // Exit process on failure
  }
};
