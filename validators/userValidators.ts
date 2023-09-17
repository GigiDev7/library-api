import { checkSchema } from "express-validator";

export const signinValidator = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters",
    },
  },
});

export const signupValidator = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters",
    },
  },
  firstname: {
    in: ["body"],
    errorMessage: "Please enter your first name",
    trim: true,
  },
  lastname: {
    in: ["body"],
    errorMessage: "Please enter your last name",
    trim: true,
  },
});
