import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT
});

export const initDB = async () => {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
