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
        trim: true,
    },
    genre: {
        in: ["body"],
        isString: {
            errorMessage: "Please enter valid genre a book",
        },
        trim: true,
    },
    author: {
        in: ["body"],
        isString: {
            errorMessage: "Please enter valid author a book",
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
