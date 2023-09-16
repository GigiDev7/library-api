"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
const Rental = db_1.sequelize.define("Rentals", {
    rent_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    return_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
user_1.default.belongsToMany(book_1.default, { through: Rental });
book_1.default.belongsToMany(user_1.default, { through: Rental });
exports.default = Rental;
