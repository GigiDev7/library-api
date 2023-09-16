import express from "express";
import booksController from "../controllers/booksController";

const router = express.Router();

router.route("/").post(booksController.createBook);

export default router;
