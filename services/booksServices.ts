import Book from "../models/book";

const createBook = (bookData: {
  name: string;
  author: string;
  genre: string;
  quantity: number;
}) => {
  return Book.create(bookData);
};

export default {
  createBook,
};
