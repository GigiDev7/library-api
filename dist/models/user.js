"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const User = db_1.sequelize.define("User", {
    firstname: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
exports.default = User;
