import express, { json } from "express";
import cors from "cors";
export const app = express();

//middlewares
app.use(json());
app.use(cors());

app.listen(5000, () => {
  console.log("server has started at post ", 5000);
});
