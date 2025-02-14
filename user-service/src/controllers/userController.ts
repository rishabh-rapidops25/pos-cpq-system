// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {logger} from "../utils/logger";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get Repository (Ensures TypeORM is initialized)
    const userRepository = AppDataSource.getRepository(User);
    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    // Create & Save User
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    logger.info("User Created Successfully");
    res.status(201).json({
      message: "User Registered Successfully",
      data: { id: user.id, name: user.name, email: user.email },
    });
    return;
  } catch (err) {
    logger.error("Error while creating User", err);
    res.status(500).json({ message: "Internal Server Error", err });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Get Repository
    const userRepository = AppDataSource.getRepository(User);

    // Find User
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.error("Invalid Credentials");
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user?.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    res.json({ name: user.name, email: user.email, token });
  } catch (err) {
    logger.error("Internal Server Error");
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Frontend should handle token removal; backend can use a blacklist approach
    res.status(200).json({
      message: "User Logged Out (Token should be removed on client side)",
    });
    return
  } catch (err) {
    logger.error("Error while logout");
    res.status(500).json({ message: "Internal Server Error" });
    return
  }
};
