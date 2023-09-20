"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = __importDefault(require("../controllers/booksController"));
const bookValidators_1 = require("../validators/bookValidators");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const protectAdmin_1 = __importDefault(require("../middlewares/protectAdmin"));
const router = express_1.default.Router();
router
    .route("/")
    .get(booksController_1.default.getBooks)
    .post(bookValidators_1.createBookValidator, validationHandler_1.default, protectRoute_1.default, protectAdmin_1.default, booksController_1.default.createBook);
router
    .route("/:bookId")
    .get(booksController_1.default.getSingleBook)
    .delete(protectRoute_1.default, protectAdmin_1.default, booksController_1.default.deleteBook)
    .put(protectRoute_1.default, protectAdmin_1.default, booksController_1.default.updateBook);
exports.default = router;
