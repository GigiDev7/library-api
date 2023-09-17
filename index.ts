import express from "express";
import dotenv from "dotenv";
import { connect } from "./db";
import bookRouter from "./routes/bookRouter";
import userRouter from "./routes/userRouter";
import rentalRouter from "./routes/rentalRouter";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);
app.use("/api/rent", rentalRouter);

app.use(errorHandler);

app.listen(8000, async () => {
  await connect();
  console.log("app listening");
});
