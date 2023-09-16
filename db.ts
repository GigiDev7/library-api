import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "WalterWhite7",
  dialect: "postgres",
  database: "library",
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
