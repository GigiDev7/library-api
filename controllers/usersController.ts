import { NextFunction, Request, Response } from "express";
import usersServices from "../services/usersServices";

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersServices.siginin(req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersServices.signup(req.body);
    res.status(201).json({ message: "Successfully registered" });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(error);
  }
};

export default {
  signin,
  signup,
};
