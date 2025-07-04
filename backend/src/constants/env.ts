import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT||"5432",10);
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const WEBHOOK_SIGNING_SECRET = process.env.WEBHOOK_SIGNING_SECRET;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT||"6379",10);
export const SECRET = process.env.SECRET;
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;