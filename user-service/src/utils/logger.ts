import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

// Define log directory
const logDir = path.join(__dirname, "../../logs");

// Create a custom log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Logger configuration
const logger = winston.createLogger({
    level: "info", // Default log level
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Logs to console
        new DailyRotateFile({
            filename: `${logDir}/application-%DATE%.log`, // Rotating log file
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d", // Keep logs for 14 days
        }),
    ],
});

export default logger;
