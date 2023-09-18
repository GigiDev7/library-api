import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../db";
import User from "./user";
import Book from "./book";

interface RentalModel
  extends Model<
    InferAttributes<RentalModel>,
    InferCreationAttributes<RentalModel>
  > {
  id: CreationOptional<number>;
  rentDate: Date;
  returnDate: Date;
  BookId: number;
  UserId: number;
}

const Rental = sequelize.define<RentalModel>("Rental", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  BookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.belongsToMany(Book, { through: Rental });
Book.belongsToMany(User, { through: Rental });

Rental.belongsTo(User);
Rental.belongsTo(Book);

export default Rental;
