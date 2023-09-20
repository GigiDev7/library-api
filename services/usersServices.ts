import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError";
import Errors from "../utils/errorTypes";

type UserData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role?: string;
};

const siginin = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) {
    throw new CustomError(
      Errors.InvalidCredentialsError,
      "Invalid credentials"
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      Errors.InvalidCredentialsError,
      "Invalid credentials"
    );
  }

  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string
  );

  return {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    accessToken,
  };
};

const signup = async (userData: UserData) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const role = userData.role || "user";

  await User.create({
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    password: hashedPassword,
    role: role,
  });
};

const deleteUser = (userId: number) => {
  return User.destroy({ where: { id: userId } });
};

export default {
  siginin,
  signup,
  deleteUser,
};
