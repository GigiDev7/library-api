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
const customError_1 = __importDefault(require("../utils/customError"));
const errorTypes_1 = __importDefault(require("../utils/errorTypes"));
const createBook = (bookData) => {
    return book_1.default.create(bookData);
};
const getSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findByPk(bookId, { raw: true });
    if (!book) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Book does not exist");
    }
    return book;
});
const deleteBook = (bookId) => {
    return book_1.default.destroy({ where: { id: bookId } });
};
const updateBook = (bookData, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_1.default.update(bookData, {
        where: { id: bookId },
        returning: true,
    });
    if (result[0] === 0) {
        throw new customError_1.default(errorTypes_1.default.NotFoundError, "Book not found");
    }
    return result[1][0];
});
const getBooks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = {};
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    //Filter by author
    if (query.author) {
        filters.author = query.author;
    }
    //Filter by genre
    if (query.genre) {
        filters.genre = query.genre;
    }
    //Filter by quantity
    if (query.minQuantity) {
        filters.quantity = { [sequelize_1.Op.gte]: query.minQuantity };
    }
    if (query.maxQuantity) {
        if (query.minQuantity) {
            filters.quantity = {
                [sequelize_1.Op.between]: [query.minQuantity, query.maxQuantity],
            };
        }
        else {
            filters.quantity = { [sequelize_1.Op.lte]: query.maxQuantity };
        }
    }
    const total = yield book_1.default.count({ where: filters });
    const books = yield book_1.default.findAll({ where: filters, limit, offset });
    return { totalCount: total, books };
});
exports.default = {
    createBook,
    getSingleBook,
    deleteBook,
    updateBook,
    getBooks,
};
