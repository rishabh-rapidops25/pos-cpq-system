import { Request, Response } from 'express';
import { userRepository } from '../repository/user.repository';
import { generateToken, verifyToken } from '../utils/jwtHelper';
import {
  logger,
  HttpStatusCodes,
  HttpResponseMessages,
  ErrorMessageCodes,
  sendResponse,
} from 'shared-constants';
import { IUser } from '../interfaces/User.interface';
import { comparePassword, hashPassword } from '../utils/passwordHelper';
// import { AppDataSource } from '../db';
// import { Token } from '../models/Token';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      logger.error('Registration failed: Email already in use');
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: HttpResponseMessages.BAD_REQUEST,
      });
      return;
    }

    // Create & Save User
    const user: IUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    let userData: IUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    logger.info('User Created Successfully');

    sendResponse({
      statusCode: HttpStatusCodes.CREATED,
      res,
      message: HttpResponseMessages.CREATED,
      data: userData,
    });
  } catch (err) {
    logger.error('Error while creating user', err);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: err,
    });
    return;
  }
};

// Login an existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await userRepository.findOne({
      where: { email, isActive: true },
    });
    // If user does not exist in the database
    if (!user) {
      logger.warn('Login attempt failed: User not found');
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
        data: 'User not found',
      });
      return;
    }
    // Check if password is correct
    if (!(await comparePassword(password, user.password))) {
      logger.warn('Login attempt failed: Invalid credentials');
      sendResponse({
        statusCode: HttpStatusCodes.UNAUTHORIZED,
        res,
        message: HttpResponseMessages.UNAUTHORIZED,
        data: 'Invalid Credentials',
      });
      return;
    }

    // Ensure JWT Secret is available
    if (!process.env.JWT_SECRET) {
      logger.error('JWT Secret key is not defined');
      throw new Error('Secret key is not defined');
    }

    // Generate JWT Token
    const token = generateToken(
      { id: user.id.toString(), email: user.email, name: user.firstName },
      process.env.JWT_SECRET
    );

    // Save token to the database
    // const tokenRepository = AppDataSource.getRepository(Token);
    // const newToken = tokenRepository.create({ token, user });
    // await tokenRepository.save(newToken);

    let userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };
    logger.info('User logged in successfully...');
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: userData,
    });
  } catch (err) {
    logger.error('Error while logging in user');
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: err,
    });
    return;
  }
};

// Logout an existing user
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    // Ensure JWT Secret is available
    if (!process.env.JWT_SECRET) {
      logger.error('JWT Secret key is not defined');
      throw new Error('Secret key is not defined');
    }

    // Verify token
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      logger.warn('Logout attempt failed: Invalid token');
      sendResponse({
        statusCode: HttpStatusCodes.UNAUTHORIZED,
        res,
        message: HttpResponseMessages.UNAUTHORIZED,
        data: 'Invalid Token',
      });
      return;
    }

    // Remove token from the database
    // const tokenRepository = AppDataSource.getRepository(Token);
    // await tokenRepository.delete({ token });

    logger.info('User logged out successfully...');
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: 'User logged out successfully',
    });
  } catch (err) {
    logger.error('Error while logging out user');
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: err,
    });
    return;
  }
};
