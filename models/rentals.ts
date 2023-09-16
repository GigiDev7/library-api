import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import User from "./user";
import Book from "./book";

const Rental = sequelize.define("Rentals", {
  rent_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.belongsToMany(Book, { through: Rental });
Book.belongsToMany(User, { through: Rental });

export default Rental;
