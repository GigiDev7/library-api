import Book from "../models/book";

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
  return Book.findByPk(bookId);
};

const deleteBook = (bookId: string) => {
  return Book.destroy({ where: { id: bookId } });
};

const updateBook = async (bookData: BookData, bookId: string) => {
  const result = await Book.update(bookData, {
    where: { id: bookId },
    returning: true,
  });
  return result[1][0];
};

export default {
  createBook,
  getSingleBook,
  deleteBook,
  updateBook,
};
