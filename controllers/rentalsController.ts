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

const getSingleRent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rent = await rentalsService.getSingleRent(
      +req.params.bookId,
      req.user!.id
    );
    res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
};

const updateRent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await rentalsService.updateRent(req.body, req.user!.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteRent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rentalsService.deleteRent(+req.params.bookId, req.user!.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const getRents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await rentalsService.getRents(req.query, req.user!.id);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export default {
  createRent,
  getSingleRent,
  updateRent,
  deleteRent,
  getRents,
};
