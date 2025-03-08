import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../config';
import { join } from 'path';
import { User } from '../models/User';
console.log(
  join(__dirname, '../models/*.entity{.ts,.js}') + '====================='
);
export const dbConnection: DataSourceOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [User],
  // migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
};

export const AppDataSource = new DataSource(dbConnection);
