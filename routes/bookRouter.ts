import express from "express";
import booksController from "../controllers/booksController";

const router = express.Router();

router.route("/").post(booksController.createBook);
router
  .route("/:bookId")
  .get(booksController.getSingleBook)
  .delete(booksController.deleteBook)
  .put(booksController.updateBook);

export default router;
