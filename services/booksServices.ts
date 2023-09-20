import { Op } from "sequelize";
import Book from "../models/book";
import CustomError from "../utils/customError";
import Errors from "../utils/errorTypes";

type BookData = {
  name: string;
  author: string;
  genre: string;
  quantity: number;
};

const createBook = (bookData: BookData) => {
  return Book.create(bookData);
};

const getSingleBook = async (bookId: string) => {
  const book = await Book.findByPk(bookId, { raw: true });

  if (!book) {
    throw new CustomError(Errors.NotFoundError, "Book does not exist");
  }

  return book;
};

const deleteBook = (bookId: string) => {
  return Book.destroy({ where: { id: bookId } });
};

const updateBook = async (bookData: BookData, bookId: string) => {
  const result = await Book.update(bookData, {
    where: { id: bookId },
    returning: true,
  });
  if (result[0] === 0) {
    throw new CustomError(Errors.NotFoundError, "Book not found");
  }
  return result[1][0];
};

const getBooks = async (query: any) => {
  const filters: any = {};

  const page = query.page || 1;
  const limit = query.limit || 10;

  const offset = (page - 1) * limit;

  //Filter by author
  if (query.author) {
    filters.author = query.author;
  }

  //Filter by genre
  if (query.genre) {
    filters.genre = query.genre;
  }

  //Filter by quantity
  if (query.minQuantity) {
    filters.quantity = { [Op.gte]: query.minQuantity };
  }
  if (query.maxQuantity) {
    if (query.minQuantity) {
      filters.quantity = {
        [Op.between]: [query.minQuantity, query.maxQuantity],
      };
    } else {
      filters.quantity = { [Op.lte]: query.maxQuantity };
    }
  }

  const total = await Book.count({ where: filters });
  const books = await Book.findAll({ where: filters, limit, offset });

  return { totalCount: total, books };
};

export default {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
  getBooks,
};
