"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookRouter_1 = __importDefault(require("./routes/bookRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const rentalRouter_1 = __importDefault(require("./routes/rentalRouter"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/book", bookRouter_1.default);
app.use("/api/user", userRouter_1.default);
app.use("/api/rent", rentalRouter_1.default);
app.use(errorHandler_1.default);
exports.default = app;
