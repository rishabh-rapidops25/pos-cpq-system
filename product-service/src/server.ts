import app from "./app";
import { logger } from "shared-constants";

const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL;
app.listen(PORT, () => {
  logger.info(`===============================================`);
  logger.info(`Product-Service Server is running on port ${PORT}`);
  logger.info(`${PROTOCOL}:${PORT}/api/products`);
});
