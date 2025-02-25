import app from "./app";
import { logger } from "shared-constants";
import { AppDataSource } from "./config/ormconfig";

const PORT = process.env.PORT || 3001;
const PROTOCOL = process.env.PROTOCOL || "http://localhost";

AppDataSource.initialize()
  .then(() => {
    logger.info(`===============================================`);
    logger.info("✅ Database Connected Successfully....");

    app.listen(PORT, () => {
      logger.info(`User-Service Server is running on port ${PORT}`);
      logger.info(`${PROTOCOL}:${PORT}/api/users`);
      logger.info(`===============================================`);
    });
  })
  .catch((err) => logger.error("❌ Error initializing DataBase:", err));
