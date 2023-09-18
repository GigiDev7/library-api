import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../db";
import User from "./user";

interface BookModel
  extends Model<
    InferAttributes<BookModel>,
    InferCreationAttributes<BookModel>
  > {
  id: CreationOptional<number>;
  name: string;
  genre: string;
  author: string;
  quantity: number;
}

const Book = sequelize.define<BookModel>(
  "Book",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Book;
