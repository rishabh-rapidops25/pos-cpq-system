import { DataSource } from 'typeorm';
import dotenv from "dotenv";
import { logger } from '../utils/logger';
dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true, // Set to false in production
    logging: false,
    migrations: [],
    subscribers: [],
    entities: ["dist/models/*.js"]

});

AppDataSource.initialize()
    .then(() => {
        logger.info("✅ Database Connected Successfully....");
        logger.info(`===============================================`);
    })
    .catch((err) => logger.error("❌ Error initializing DataBase:", err));