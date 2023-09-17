import express from "express";
import usersController from "../controllers/usersController";
import {
  signinValidator,
  signupValidator,
} from "../middlewares/validators/userValidators";
import validationHandler from "../middlewares/validationHandler";
import protectRoute from "../middlewares/protectRoute";
import protectAdmin from "../middlewares/protectAdmin";

const router = express.Router();

router
  .route("/signin")
  .post(signinValidator, validationHandler, usersController.signin);
router
  .route("/signup")
  .post(signupValidator, validationHandler, usersController.signup);

router
  .route("/:userId")
  .delete(protectRoute, protectAdmin, usersController.deleteUser);

export default router;
