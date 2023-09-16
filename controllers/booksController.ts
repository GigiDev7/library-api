import { NextFunction, Request, Response } from "express";
import booksServices from "../services/booksServices";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await booksServices.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
  }
};

export default {
  createBook,
};
