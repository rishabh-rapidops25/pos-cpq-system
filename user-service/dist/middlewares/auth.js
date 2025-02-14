"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger"); // Assuming you have a logger utility
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        logger_1.logger.warn("Authorization header missing");
        return res.status(401).json({ message: "Access Denied" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        logger_1.logger.warn("Token missing in Authorization header");
        return res.status(401).json({ message: "Access Denied" });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        logger_1.logger.error("Token verification failed", err);
        return res.status(403).json({ message: "Invalid Token" });
    }
};
exports.authMiddleware = authMiddleware;
