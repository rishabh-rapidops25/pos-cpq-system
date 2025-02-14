"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
// Define log directory
const logDir = path_1.default.join(__dirname, "../../logs");
// Create a custom log format
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
// Logger configuration
const logger = winston_1.default.createLogger({
    level: "info", // Default log level
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.colorize(), logFormat),
    transports: [
        new winston_1.default.transports.Console(), // Logs to console
        new winston_daily_rotate_file_1.default({
            filename: `${logDir}/application-%DATE%.log`, // Rotating log file
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d", // Keep logs for 14 days
        }),
    ],
});
exports.default = logger;
