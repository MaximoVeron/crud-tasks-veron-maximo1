import Sequelize from "sequelize";
import dotenv from "dotenv";
import { PORT } from "../../app.js";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
});

export const initDB = async () => {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  console.log(PORT)
  await sequelize.sync();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
