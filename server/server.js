import { app } from "./express.js";
import { vaidate_jwt_token_middleware } from "./middlewares/validateJWT.middleware.js";
import { todoRoutes } from "./routes/todoRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();

app.use("/todo", vaidate_jwt_token_middleware, todoRoutes);
app.use("/user", userRoutes);
