import express from "express";
import usersController from "../controllers/usersController";
import {
  signinValidator,
  signupValidator,
} from "../middlewares/validators/userValidators";
import validationHandler from "../middlewares/validationHandler";

const router = express.Router();

router
  .route("/signin")
  .post(signinValidator, validationHandler, usersController.signin);
router
  .route("/signup")
  .post(signupValidator, validationHandler, usersController.signup);

export default router;
