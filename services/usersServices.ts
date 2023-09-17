import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type UserData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const siginin = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) {
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return;
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

  await User.create({
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    password: hashedPassword,
  });
};

export default {
  siginin,
  signup,
};
