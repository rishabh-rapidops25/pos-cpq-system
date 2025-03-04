import { AppDataSource } from "../db/db";
import { User } from "../models/User";

export const userRepository = AppDataSource.getRepository(User);
