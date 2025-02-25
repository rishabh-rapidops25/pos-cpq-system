"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("./config/mongodb");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const auth_lib_1 = require("auth-lib");
const shared_constants_1 = require("shared-constants");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", auth_lib_1.authMiddleware, indexRoutes_1.default);
const startServer = () => {
    try {
        (0, mongodb_1.connectDB)(); // Connect to MongoDB
        app.listen(PORT, () => {
            shared_constants_1.logger.info(`===============================================`);
            shared_constants_1.logger.info("✅ Database Connected Successfully....");
            shared_constants_1.logger.info(`Product-Service Server is running on port ${PORT}`);
            shared_constants_1.logger.info(`${PROTOCOL}:${PORT}/api/products`);
            shared_constants_1.logger.info(`===============================================`);
        });
    }
    catch (error) {
        shared_constants_1.logger.error("❌ Error starting the server:", error);
        process.exit(1); // Exit process on failure
    }
};
exports.startServer = startServer;
// export default app;
