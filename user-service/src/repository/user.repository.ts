import { AppDataSource } from '../db';
import { User } from '../models/User.entity';

export const userRepository = AppDataSource.getRepository(User);
