import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  sendResponse,
} from 'shared-constants';
dotenv.config();
interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    logger.error('Access denied, header not found');
    return sendResponse({
      statusCode: HttpStatusCodes.UNAUTHORIZED,
      res,
      message: HttpResponseMessages.UNAUTHORIZED,
      error: 'Access Denied, Header not found',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    logger.error('Access Denied, token missing');
    return sendResponse({
      statusCode: HttpStatusCodes.UNAUTHORIZED,
      res,
      message: HttpResponseMessages.UNAUTHORIZED,
      error: 'Access Denied, Token Missing',
    });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logger.error('secret is not defined');
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    logger.info('Token verified successfully for user');
    next();
  } catch (err) {
    logger.error('Invalid Token Found', err);
    return sendResponse({
      statusCode: HttpStatusCodes.UNAUTHORIZED,
      res,
      message: HttpResponseMessages.UNAUTHORIZED,
      error: 'Invalid Token Found',
    });
  }
};
