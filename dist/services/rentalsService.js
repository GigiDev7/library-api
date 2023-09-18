"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
const rentals_1 = __importDefault(require("../models/rentals"));
const user_1 = __importDefault(require("../models/user"));
const customError_1 = __importDefault(require("../utils/customError"));
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
const createRent = (rentalData) => __awaiter(void 0, void 0, void 0, function* () {
    return rentals_1.default.create(rentalData);
});
const getSingleRent = (BookId, UserId) => {
    return rentals_1.default.findOne({
        where: { BookId, UserId },
        include: [
            { model: book_1.default, attributes: ["name", "genre", "author"] },
            { model: user_1.default, attributes: ["firstname", "lastname", "email", "role"] },
        ],
    });
};
const updateRent = (rentalData, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rentals_1.default.update(rentalData, {
        where: { BookId: rentalData.BookId, UserId },
        returning: true,
    });
    if (result[0] === 0) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Rent not found");
    }
    return result[1][0];
});
exports.default = {
    createRent,
    getSingleRent,
    updateRent,
};
