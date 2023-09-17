import { NextFunction, Request, Response } from "express";
import Errors from "../utils/errorTypes";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err?.name === Errors.InvalidCredentialsError) {
    return res.status(401).json({ message: err.message });
  }
  return res.status(500).json({ message: "Something went wrong" });
}
