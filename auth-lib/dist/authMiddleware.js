"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const shared_constants_1 = require("shared-constants");
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        shared_constants_1.logger.error("Access denied, header not found");
        res.status(shared_constants_1.HttpStatusCodes.UNAUTHORIZED).json({
            statusCode: shared_constants_1.HttpStatusCodes.UNAUTHORIZED,
            httpResponse: shared_constants_1.HttpResponseMessages.UNAUTHORIZED,
            error: shared_constants_1.ErrorMessageCodes.UNAUTHORIZED_ACCESS,
            message: "Access Denied",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        shared_constants_1.logger.error("Access Denied, token missing");
        res.status(shared_constants_1.HttpStatusCodes.UNAUTHORIZED).json({
            statusCode: shared_constants_1.HttpStatusCodes.UNAUTHORIZED,
            httpResponse: shared_constants_1.HttpResponseMessages.UNAUTHORIZED,
            error: shared_constants_1.ErrorMessageCodes.UNAUTHORIZED_ACCESS,
            message: "Access Denied",
        });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            shared_constants_1.logger.error("secret is not defined");
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        shared_constants_1.logger.info("Token verified successfully for user");
        next();
    }
    catch (err) {
        shared_constants_1.logger.error("Invalid Token Found", err);
        res.status(shared_constants_1.HttpStatusCodes.FORBIDDEN).json({
            statusCode: shared_constants_1.HttpStatusCodes.FORBIDDEN,
            httpResponse: shared_constants_1.HttpResponseMessages.FORBIDDEN,
            error: shared_constants_1.ErrorMessageCodes.INTERNAL_SERVER_ERROR,
            message: "Invalid Access",
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
