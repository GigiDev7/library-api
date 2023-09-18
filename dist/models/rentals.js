"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
const Rental = db_1.sequelize.define("Rental", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    BookId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: book_1.default,
            key: "id",
        },
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
});
user_1.default.belongsToMany(book_1.default, { through: Rental });
book_1.default.belongsToMany(user_1.default, { through: Rental });
Rental.belongsTo(user_1.default);
Rental.belongsTo(book_1.default);
exports.default = Rental;
