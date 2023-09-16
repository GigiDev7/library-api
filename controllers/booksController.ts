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

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await booksServices.getSingleBook(req.params.bookId);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await booksServices.deleteBook(req.params.bookId);
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await booksServices.updateBook(req.body, req.params.bookId);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

export default {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
};
