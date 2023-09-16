"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = __importDefault(require("../controllers/booksController"));
const router = express_1.default.Router();
router.route("/").post(booksController_1.default.createBook);
router
    .route("/:bookId")
    .get(booksController_1.default.getSingleBook)
    .delete(booksController_1.default.deleteBook)
    .put(booksController_1.default.updateBook);
exports.default = router;
