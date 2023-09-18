import Book from "../models/book";
import Rental from "../models/rentals";
import User from "../models/user";
import CustomError from "../utils/customError";
import Errors from "../utils/errorTypes";

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

const updateRent = async (
  rentalData: Omit<RentalData, "UserId">,
  UserId: number
) => {
  const result = await Rental.update(rentalData, {
    where: { BookId: rentalData.BookId, UserId },
    returning: true,
  });
  if (result[0] === 0) {
    throw new CustomError(Errors.NotFoundError, "Rent not found");
  }
  return result[1][0];
};

export default {
  createRent,
  getSingleRent,
  updateRent,
};
