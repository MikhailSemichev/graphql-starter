import { config } from 'dotenv';
config();

export const ENVIRONMENT = process.env.ENVIRONMENT;

export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_TIMEOUT = +process.env.MONGO_TIMEOUT;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
export const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

