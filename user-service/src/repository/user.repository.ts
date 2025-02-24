import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";

export const userRepository = AppDataSource.getRepository(User);
