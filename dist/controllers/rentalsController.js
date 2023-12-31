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
const rentalsService_1 = __importDefault(require("../services/rentalsService"));
const createRent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRent = yield rentalsService_1.default.createRent({
            BookId: req.body.BookId,
            rentDate: req.body.rentDate,
            returnDate: req.body.returnDate,
            UserId: req.user.id,
        });
        res.status(201).json(newRent);
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "You already rented this book" });
        }
        next(error);
    }
});
const getSingleRent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rent = yield rentalsService_1.default.getSingleRent(+req.params.bookId, req.user.id);
        res.status(200).json(rent);
    }
    catch (error) {
        next(error);
    }
});
const updateRent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield rentalsService_1.default.updateRent(req.body, req.user.id);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
const deleteRent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rentalsService_1.default.deleteRent(+req.params.bookId, req.user.id);
        res.status(204).json();
    }
    catch (error) {
        next(error);
    }
});
const getRents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield rentalsService_1.default.getRents(req.query, req.user.id);
        res.status(200).json(results);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    createRent,
    getSingleRent,
    updateRent,
    deleteRent,
    getRents,
};
