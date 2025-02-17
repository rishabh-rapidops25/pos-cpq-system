import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { logger } from "./logger";
dotenv.config();
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    logger.error("Access denied auth header not found", authHeader);
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    logger.error("Access Denied due token not provide", token);
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logger.error("JWT_SECRET is not defined", secret);
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    logger.info("Token verified successfully for user", req.user);
    next();
  } catch (err) {
    logger.error("Invalid Token Found", err);
    res.status(403).json({ message: "Invalid Token" });
    return;
  }
};
