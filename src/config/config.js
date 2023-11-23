import { config } from "dotenv";

config();

const PORT = 3000;
const DB_PORT = 3306;
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = '278brandon';
const DB = 'seguridad';

export { PORT, DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB };