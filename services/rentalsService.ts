import Rental from "../models/rentals";

type RentalData = {
  returnDate: Date;
  rentDate: Date;
  BookId: number;
  UserId: number;
};

const createRent = async (rentalData: RentalData) => {
  return Rental.create(rentalData);
};

const getSingleRent = () => {};

export default {
  createRent,
};
