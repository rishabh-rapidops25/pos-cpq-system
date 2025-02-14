import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3002;
const PROTOCOL = process.env.PROTOCOL || "http://localhost";
app.listen(PORT, () => {
    logger.info(`===============================================`);
    logger.info(`Product-Service Server is running on port ${PORT}`);
    logger.info(`${PROTOCOL}:${PORT}/api/products`);
});
