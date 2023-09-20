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
const sequelize_1 = require("sequelize");
const book_1 = __importDefault(require("../models/book"));
const rentals_1 = __importDefault(require("../models/rentals"));
const user_1 = __importDefault(require("../models/user"));
const customError_1 = __importDefault(require("../utils/customError"));
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
const createRent = (rentalData) => __awaiter(void 0, void 0, void 0, function* () {
    return rentals_1.default.create(rentalData);
});
const getSingleRent = (BookId, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    const rent = yield rentals_1.default.findOne({
        where: { BookId, UserId },
        include: [
            { model: book_1.default, attributes: ["name", "genre", "author"] },
            { model: user_1.default, attributes: ["firstname", "lastname", "email", "role"] },
        ],
    });
    if (!rent) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Rent does not exist");
    }
    return rent;
});
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
const deleteRent = (BookId, UserId) => {
    return rentals_1.default.destroy({ where: { BookId, UserId } });
};
const getRents = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    const bookFilters = {};
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    //Filter by rent date
    if (query.minRentDate) {
        filters.rentDate = { [sequelize_1.Op.gt]: query.minRentDate };
    }
    if (query.maxRentDate) {
        if (query.minRentDate) {
            filters.rentDate = {
                [sequelize_1.Op.between]: [query.minRentDate, query.maxRentDate],
            };
        }
        else {
            filters.rentDate = { [sequelize_1.Op.lt]: query.maxRentDate };
        }
    }
    //Filter by return date
    if (query.minReturnDate) {
        filters.returnDate = { [sequelize_1.Op.gt]: query.minReturnDate };
    }
    if (query.maxReturnDate) {
        if (query.minReturnDate) {
            filters.returnDate = {
                [sequelize_1.Op.between]: [query.minReturnDate, query.maxReturnDate],
            };
        }
        else {
            filters.returnDate = { [sequelize_1.Op.lt]: query.maxReturnDate };
        }
    }
    //Filter by book name
    if (query.bookName) {
        bookFilters.name = query.bookName;
    }
    //Filter by book genre
    if (query.genre) {
        bookFilters.genre = query.genre;
    }
    //Filter by book author
    if (query.author) {
        bookFilters.author = query.author;
    }
    const total = yield rentals_1.default.count({
        include: [{ model: book_1.default, where: bookFilters }, { model: user_1.default }],
        where: filters,
    });
    const rents = yield rentals_1.default.findAll({
        where: filters,
        limit,
        offset,
        include: [
            {
                model: book_1.default,
                attributes: ["name", "genre", "author"],
                where: bookFilters,
            },
            {
                model: user_1.default,
                attributes: ["firstname", "lastname", "email", "role"],
                where: { id: userId },
            },
        ],
    });
    return { totalRents: total, rents };
});
exports.default = {
    createRent,
    getSingleRent,
    updateRent,
    deleteRent,
    getRents,
};
