import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db_port = +(process.env.PORT as any);

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: db_port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  database: process.env.DB_DATABASE,
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};
