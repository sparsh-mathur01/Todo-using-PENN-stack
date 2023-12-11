import express, { json } from "express";
import cors from "cors";
export const app = express();

//middlewares
app.use(json());
app.use(cors());

const server = app.listen(5000, () => {
  console.log("server has started at post ", 5000);
});

// const gracefulShutdown = async (signal) => {
//   console.log("Recieved graceful shutdown", { signal });
//   await server.close();
//   process.exit();
// };

// process.on("SIGINT", gracefulShutdown);
// process.on("SIGTERM", gracefulShutdown);
    