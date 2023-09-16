import express from "express";
import { connect } from "./db";
import bookRouter from "./routes/bookRouter";

const app = express();

app.use(express.json());

app.use("/api/book", bookRouter);

app.listen(8000, async () => {
  await connect();
  console.log("app listening");
});
