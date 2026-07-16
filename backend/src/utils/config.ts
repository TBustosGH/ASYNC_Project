import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MAIN_DB_URI = process.env.MAIN_DB_URI || null;