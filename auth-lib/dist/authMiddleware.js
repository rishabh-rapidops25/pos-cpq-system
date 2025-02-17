"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./logger");
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        logger_1.logger.error("Access denied auth header not found", authHeader);
        res.status(401).json({ message: "Access Denied" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        logger_1.logger.error("Access Denied due token not provide", token);
        res.status(401).json({ message: "Access Denied" });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            logger_1.logger.error("JWT_SECRET is not defined", secret);
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        logger_1.logger.info("Token verified successfully for user", req.user);
        next();
    }
    catch (err) {
        logger_1.logger.error("Invalid Token Found", err);
        res.status(403).json({ message: "Invalid Token" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
