import express from "express";
import rentalsController from "../controllers/rentalsController";
import protectRoute from "../middlewares/protectRoute";
import { rentalValidator } from "../validators/rentalValidators";
import validationHandler from "../middlewares/validationHandler";

const router = express.Router();

router.use(protectRoute);

router
  .route("/")
  .post(rentalValidator, validationHandler, rentalsController.createRent);

router
  .route("/:bookId/:userId")
  .get(rentalsController.getSingleRent)
  .put(rentalValidator, validationHandler, rentalsController.updateRent);

export default router;
