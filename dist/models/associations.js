"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("./book"));
const user_1 = __importDefault(require("./user"));
const rentals_1 = __importDefault(require("./rentals"));
user_1.default.belongsToMany(book_1.default, { through: rentals_1.default });
book_1.default.belongsToMany(user_1.default, { through: rentals_1.default });
