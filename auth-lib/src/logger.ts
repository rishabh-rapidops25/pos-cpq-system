import { createLogger, format, transports } from "winston";
import path from "path";

const logDirectory = path.join(__dirname, "../../", "bin");

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(logDirectory, "info.log"),
      level: "info",
    }),
    new transports.File({ filename: path.join(logDirectory, "combined.log") }),
    new transports.Console(),
  ],
});
