import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3001;
const PROTOCOL = process.env.PROTOCOL || "http://localhost";
app.listen(PORT, () => {
  logger.info(`===============================================`);
  logger.info(`User-Service Server is running on port ${PORT}`);
  logger.info(`${PROTOCOL}:${PORT}/api/users`);
});
