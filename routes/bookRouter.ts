import express from "express";
import booksController from "../controllers/booksController";
import { createBookValidator } from "../validators/bookValidators";
import validationHandler from "../middlewares/validationHandler";

const router = express.Router();

router
  .route("/")
  .post(createBookValidator, validationHandler, booksController.createBook);
router
  .route("/:bookId")
  .get(booksController.getSingleBook)
  .delete(booksController.deleteBook)
  .put(booksController.updateBook);

export default router;
