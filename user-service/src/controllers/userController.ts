import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Joi Validation
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get Repository (Ensures TypeORM is initialized)
    const userRepository = AppDataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create & Save User
    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);

    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    // Get Repository
    const userRepository = AppDataSource.getRepository(User);

    // Find User
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.error("Invalid Credentials")
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (err) {
    logger.error("Internal Server Error")
    res.status(500).json({ message: "Internal Server Error"})
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Frontend should handle token removal; backend can use a blacklist approach
    return res.json({ message: "User Logged Out (Token should be removed on client side)" });
  } catch (err) {
    next(err);
  }
};
