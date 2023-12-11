import express from "express";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { isMyTodoMiddleware } from "../middlewares/isMyTodo.middleware.js";

export const todoRoutes = express.Router();


// get all todos
todoRoutes.get("/", getAllTodos);
// create todo
todoRoutes.post("/create", createTodo);

//isMyTodoMiddleWare
todoRoutes.use("/:todoId", isMyTodoMiddleware);

//update a todo
todoRoutes.put("/:todoId", updateTodo);
//delete a todo
todoRoutes.delete("/:todoId", deleteTodo);
