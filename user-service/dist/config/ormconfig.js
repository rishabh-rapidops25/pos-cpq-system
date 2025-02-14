"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true, // Set to false in production
    logging: false,
    migrations: [],
    subscribers: [],
    entities: ["dist/models/*.js"]
});
exports.AppDataSource.initialize()
    .then(() => {
    logger_1.logger.info("✅ Database Connected Successfully....");
    logger_1.logger.info(`===============================================`);
})
    .catch((err) => logger_1.logger.error("❌ Error initializing DataBase:", err));
