import express from "express";
import booksController from "../controllers/booksController";
import { createBookValidator } from "../validators/bookValidators";
import validationHandler from "../middlewares/validationHandler";
import protectRoute from "../middlewares/protectRoute";
import protectAdmin from "../middlewares/protectAdmin";

const router = express.Router();

router
  .route("/")
  .get(booksController.getBooks)
  .post(
    createBookValidator,
    validationHandler,
    protectRoute,
    protectAdmin,
    booksController.createBook
  );

router
  .route("/:bookId")
  .get(booksController.getSingleBook)
  .delete(protectRoute, protectAdmin, booksController.deleteBook)
  .put(protectRoute, protectAdmin, booksController.updateBook);

export default router;
