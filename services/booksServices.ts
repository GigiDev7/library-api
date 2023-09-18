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

const getSingleBook = (bookId: string) => {
  return Book.findByPk(bookId, { raw: true });
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

export default {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
};
