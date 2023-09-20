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
const booksServices_1 = __importDefault(require("../services/booksServices"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield booksServices_1.default.createBook(req.body);
        res.status(201).json(book);
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ message: "Book already exists" });
        }
        next(error);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield booksServices_1.default.getSingleBook(req.params.bookId);
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield booksServices_1.default.deleteBook(req.params.bookId);
        res.status(204).json();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield booksServices_1.default.updateBook(req.body, req.params.bookId);
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booksServices_1.default.getBooks(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    createBook,
    getSingleBook,
    deleteBook,
    updateBook,
    getBooks,
};
