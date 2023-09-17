import { NextFunction, Request, Response } from "express";
import rentalsService from "../services/rentalsService";

const createRent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newRent = await rentalsService.createRent({
      BookId: req.body.BookId,
      rentDate: req.body.rentDate,
      returnDate: req.body.returnDate,
      UserId: req.user!.id,
    });
    res.status(201).json(newRent);
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "You already rented this book" });
    }
    next(error);
  }
};

export default {
  createRent,
};