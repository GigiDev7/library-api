"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalValidator = void 0;
const express_validator_1 = require("express-validator");
exports.rentalValidator = (0, express_validator_1.checkSchema)({
    BookId: {
        in: ["body"],
        isNumeric: {
            errorMessage: "Please provide book id",
        },
    },
    returnDate: {
        in: ["body"],
        isDate: {
            errorMessage: "Please provide valid return date",
        },
    },
    rentDate: {
        in: ["body"],
        isDate: {
            errorMessage: "Please provide valid return date",
        },
    },
});
