import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from "../config";
import { join } from "path";

export const dbConnection: DataSourceOptions = {
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [join(__dirname, "../**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "../migrations/*{.ts,.js}")],
};

export const AppDataSource = new DataSource(dbConnection);
