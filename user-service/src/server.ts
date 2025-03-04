import app from "./app";
import { logger } from "shared-constants";
import { AppDataSource } from "./db/db";

const { PORT, HOST } = process.env;

AppDataSource.initialize()
  .then(() => {
    logger.info(`===============================================`);
    logger.info("✅ Database Connected Successfully....");

    app.listen(PORT, () => {
      logger.info(`User-Service Server is running on port ${PORT}`);
      logger.info(`http://${HOST}:${PORT}/api/products`);
      logger.info(`===============================================`);
    });
  })
  .catch((err) => logger.error("❌ Error initializing DataBase:", err));
