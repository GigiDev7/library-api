import app from "./app";
import { connect } from "./db";

const PORT = process.env.PORT || 8000;

app.listen(8000, async () => {
  await connect();
  console.log(`App listening on port ${PORT}`);
});
