import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
interface AuthRequest extends Request {
    user?: string | JwtPayload;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
