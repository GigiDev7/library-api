import Book from "../models/book";
import Rental from "../models/rentals";
import User from "../models/user";

type RentalData = {
  returnDate: Date;
  rentDate: Date;
  BookId: number;
  UserId: number;
};

const createRent = async (rentalData: RentalData) => {
  return Rental.create(rentalData);
};

const getSingleRent = (BookId: number, UserId: number) => {
  return Rental.findOne({
    where: { BookId, UserId },
    include: [
      { model: Book, attributes: ["name", "genre", "author"] },
      { model: User, attributes: ["firstname", "lastname", "email", "role"] },
    ],
  });
};

export default {
  createRent,
  getSingleRent,
};
