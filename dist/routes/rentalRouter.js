"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentalsController_1 = __importDefault(require("../controllers/rentalsController"));
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const rentalValidators_1 = require("../validators/rentalValidators");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const router = express_1.default.Router();
router.use(protectRoute_1.default);
router
    .route("/")
    .post(rentalValidators_1.rentalValidator, validationHandler_1.default, rentalsController_1.default.createRent);
router
    .route("/:bookId")
    .get(rentalsController_1.default.getSingleRent)
    .put(rentalValidators_1.rentalValidator, validationHandler_1.default, rentalsController_1.default.updateRent)
    .delete(rentalsController_1.default.deleteRent);
exports.default = router;
