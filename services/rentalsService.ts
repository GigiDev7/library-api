import { Op } from "sequelize";
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

const deleteRent = (BookId: number, UserId: number) => {
  return Rental.destroy({ where: { BookId, UserId } });
};

const getRents = async (query: any) => {
  const filters: any = {};
  const bookFilters: any = {};

  const page = query.page || 1;
  const limit = query.limit || 10;

  const offset = (page - 1) * limit;

  //Filter by rent date
  if (query.minRentDate) {
    filters.rentDate = { [Op.gt]: query.minRentDate };
  }
  if (query.maxRentDate) {
    if (query.minRentDate) {
      filters.rentDate = {
        [Op.between]: [query.minRentDate, query.maxRentDate],
      };
    } else {
      filters.rentDate = { [Op.lt]: query.maxRentDate };
    }
  }

  //Filter by return date
  if (query.minReturnDate) {
    filters.returnDate = { [Op.gt]: query.minReturnDate };
  }
  if (query.maxReturnDate) {
    if (query.minReturnDate) {
      filters.returnDate = {
        [Op.between]: [query.minReturnDate, query.maxReturnDate],
      };
    } else {
      filters.returnDate = { [Op.lt]: query.maxReturnDate };
    }
  }

  //Filter by book name
  if (query.bookName) {
    bookFilters.name = query.bookName;
  }

  //Filter by book genre
  if (query.genre) {
    bookFilters.genre = query.genre;
  }

  //Filter by book author
  if (query.author) {
    bookFilters.author = query.author;
  }

  const total = await Rental.count({
    include: [{ model: Book, where: bookFilters }, { model: User }],
    where: filters,
  });

  const rents = await Rental.findAll({
    where: filters,
    limit,
    offset,
    include: [
      {
        model: Book,
        attributes: ["name", "genre", "author"],
        where: bookFilters,
      },
      {
        model: User,
        attributes: ["firstname", "lastname", "email", "role"],
      },
    ],
  });

  return { totalRents: total, rents };
};

export default {
  createRent,
  getSingleRent,
  updateRent,
  deleteRent,
  getRents,
};
