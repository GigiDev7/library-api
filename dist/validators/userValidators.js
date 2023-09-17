"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.signinValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signinValidator = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Please provide a valid email address",
        },
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters",
        },
    },
});
exports.signupValidator = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Please provide a valid email address",
        },
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters",
        },
    },
    firstname: {
        in: ["body"],
        errorMessage: "Please enter your first name",
        trim: true,
    },
    lastname: {
        in: ["body"],
        errorMessage: "Please enter your last name",
        trim: true,
    },
});
