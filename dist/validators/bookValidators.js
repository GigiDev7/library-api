"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createBookValidator = (0, express_validator_1.checkSchema)({
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Please enter valid name of a book",
        },
        isLength: {
            options: { max: 50 },
            errorMessage: "Name should not exceed 50 characters",
        },
        trim: true,
    },
    genre: {
        in: ["body"],
        isString: {
            errorMessage: "Please enter valid genre a book",
        },
        isLength: {
            options: { max: 20 },
            errorMessage: "Genre should not exceed 20 characters",
        },
        trim: true,
    },
    author: {
        in: ["body"],
        isString: {
            errorMessage: "Please enter valid author a book",
        },
        isLength: {
            options: { max: 50 },
            errorMessage: "Author should not exceed 50 characters",
        },
        trim: true,
    },
    quantity: {
        in: ["body"],
        isNumeric: {
            errorMessage: "Please provude valid quantity of a book",
        },
        custom: {
            options: (value) => {
                if (parseFloat(value) >= 1) {
                    return true;
                }
                throw new Error("Quantity must be at least 1");
            },
        },
    },
});
