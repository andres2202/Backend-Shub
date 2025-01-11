import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dataBaseURL = process.env.DATABASE_URL;

if(!dataBaseURL) {
    throw new Error('DATABASE_URL must be set in the environment variables');
}

export const sequelize = new Sequelize(dataBaseURL);