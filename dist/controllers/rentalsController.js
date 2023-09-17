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
exports.default = {
    createRent,
};
