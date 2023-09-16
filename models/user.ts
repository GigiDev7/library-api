import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const User = sequelize.define(
  "User",
  {
    firstname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
