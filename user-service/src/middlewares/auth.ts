import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import logger  from "../utils/logger"; // Assuming you have a logger utility

dotenv.config();

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        logger.warn("Authorization header missing");
        return res.status(401).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        logger.warn("Token missing in Authorization header");
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        logger.error("Token verification failed", err);
        return res.status(403).json({ message: "Invalid Token" });
    }
};
