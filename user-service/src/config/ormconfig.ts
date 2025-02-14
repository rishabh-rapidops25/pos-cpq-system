import { DataSource } from 'typeorm';
import dotenv from "dotenv";
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
    entities: ["dist/models/*.ts"]
});

AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database Connected");
    })
    .catch((err) => console.error("❌ Error initializing DB:", err));