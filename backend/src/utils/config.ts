import dotenv from "dotenv";

dotenv.config();

export const MAIN_DB_URI = process.env.MAIN_DB_URI || null;
// Database connection info
export const DB_NAME = process.env.DB_NAME || null;
export const DB_USERNAME = process.env.DB_USERNAME || null;
export const DB_PASSWORD = process.env.DB_PASSWORD || null;
export const DB_HOST = process.env.DB_HOST || null;
export const DB_PORT = Number(process.env.DB_PORT) || null
// Application port
export const APP_PORT = Number(process.env.APP_PORT) || 4000;