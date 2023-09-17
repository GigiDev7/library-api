import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return res.status(401).json({ message: "Authentication Failed" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decodedData as JwtPayload).id;
    const user = await User.findByPk(userId, { raw: true });
    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
    req.user = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Authentication Failed" });
  }
}
