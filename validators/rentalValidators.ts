import { checkSchema } from "express-validator";

export const rentalValidator = checkSchema({
  BookId: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Please provide book id",
    },
  },
  returnDate: {
    in: ["body"],
    isDate: {
      errorMessage: "Please provide valid return date",
    },
  },
  rentDate: {
    in: ["body"],
    isDate: {
      errorMessage: "Please provide valid return date",
    },
  },
});
