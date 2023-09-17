"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const userValidators_1 = require("../middlewares/validators/userValidators");
const validationHandler_1 = __importDefault(require("../middlewares/validationHandler"));
const router = express_1.default.Router();
router
    .route("/signin")
    .post(userValidators_1.signinValidator, validationHandler_1.default, usersController_1.default.signin);
router
    .route("/signup")
    .post(userValidators_1.signupValidator, validationHandler_1.default, usersController_1.default.signup);
exports.default = router;
