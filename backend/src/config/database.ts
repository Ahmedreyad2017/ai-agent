import {Sequelize} from 'sequelize-typescript'
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME,} from "../constants";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
})