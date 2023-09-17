"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
var UserRole;
(function (UserRole) {
    UserRole["user"] = "user";
    UserRole["admin"] = "admin";
})(UserRole || (UserRole = {}));
const User = db_1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["admin", "user"],
        defaultValue: "user",
    },
}, {
    timestamps: true,
});
exports.default = User;
