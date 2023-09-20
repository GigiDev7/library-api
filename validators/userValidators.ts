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
      options: { min: 8, max: 50 },
      errorMessage: "Password must be at least 8 and max 50 characters long",
    },
  },
});

export const signupValidator = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
    isLength: {
      options: { max: 200 },
      errorMessage: "Email should not exceed 50 characters",
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
    isLength: {
      options: { max: 50 },
      errorMessage: "Firstname should not exceed 50 characters",
    },
    trim: true,
  },
  lastname: {
    in: ["body"],
    errorMessage: "Please enter your last name",
    isLength: {
      options: { max: 50 },
      errorMessage: "Lastname should not exceed 50 characters",
    },
    trim: true,
  },
});
