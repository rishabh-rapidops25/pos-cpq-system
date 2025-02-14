"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const logDirectory = path_1.default.join(__dirname, '../../', 'bin');
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.transports.File({ filename: path_1.default.join(logDirectory, 'error.log'), level: 'error' }),
        new winston_1.transports.File({ filename: path_1.default.join(logDirectory, 'info.log'), level: 'info' }),
        new winston_1.transports.File({ filename: path_1.default.join(logDirectory, 'combined.log') }),
        new winston_1.transports.Console()
    ]
});
