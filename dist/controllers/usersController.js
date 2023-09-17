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
const usersServices_1 = __importDefault(require("../services/usersServices"));
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersServices_1.default.siginin(req.body.email, req.body.password);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usersServices_1.default.signup(req.body);
        res.status(201).json({ message: "Successfully registered" });
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ message: "User already exists" });
        }
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usersServices_1.default.deleteUser(req.params.userId);
        res.status(204).json();
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    signin,
    signup,
    deleteUser,
};
